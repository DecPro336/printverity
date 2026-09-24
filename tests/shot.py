"""Real-time page capture through the Chrome DevTools protocol: loads a URL in headless Chrome, waits for the app to settle,
reports console errors, and writes a screenshot. Used by the system check for the React views (WebGL included)."""
from __future__ import annotations
import asyncio, base64, json, os, socket, subprocess, sys, time, urllib.request, shutil

def _free_port():
    s = socket.socket(); s.bind(("127.0.0.1", 0)); p = s.getsockname()[1]; s.close(); return p

async def capture(url: str, out: str, settle: float = 4.0, width=1440, height=900, timeout=40.0, steps: list[str] | None = None, probe: str | None = None) -> dict:
    """steps: JavaScript statements run in order after the page settles (clicks, navigation), each followed by a short wait.
    probe: a JavaScript expression evaluated at the end; its value is returned as "probe"."""
    import websockets
    chrome = shutil.which("google-chrome") or shutil.which("chromium") or shutil.which("chromium-browser")
    port = _free_port()
    proc = subprocess.Popen([chrome, "--headless=new", "--no-sandbox", "--disable-gpu", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--hide-scrollbars",
                             f"--window-size={width},{height}", f"--remote-debugging-port={port}"] + os.environ.get("PV_CHROME_FLAGS", "").split() + ["about:blank"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    errors, logs = [], []
    try:
        for _ in range(100):
            try:
                targets = json.loads(urllib.request.urlopen(f"http://127.0.0.1:{port}/json", timeout=1).read()); break
            except Exception: await asyncio.sleep(0.1)
        page = next(t for t in targets if t["type"] == "page")
        async with websockets.connect(page["webSocketDebuggerUrl"], max_size=64 * 1024 * 1024) as ws:
            mid = [0]
            async def send(method, **params):
                mid[0] += 1; await ws.send(json.dumps({"id": mid[0], "method": method, "params": params})); want = mid[0]
                while True:
                    msg = json.loads(await asyncio.wait_for(ws.recv(), timeout))
                    if msg.get("id") == want: return msg.get("result", {})
                    _collect(msg, errors, logs)
            await send("Runtime.enable"); await send("Log.enable"); await send("Page.enable")
            await send("Emulation.setDeviceMetricsOverride", width=width, height=height, deviceScaleFactor=1, mobile=False)
            await send("Page.navigate", url=url)
            t0 = time.time()
            while time.time() - t0 < settle:
                try:
                    msg = json.loads(await asyncio.wait_for(ws.recv(), 0.25)); _collect(msg, errors, logs)
                except asyncio.TimeoutError: pass
            # wait until every <img> has finished loading (drawing renders are fetched after the app mounts)
            for _ in range(int(timeout * 4)):
                r = await send("Runtime.evaluate", expression="Array.from(document.images).every(i => i.complete) && document.readyState === 'complete'", returnByValue=True)
                if r.get("result", {}).get("value"): break
                await asyncio.sleep(0.25)
            await asyncio.sleep(0.6)
            for js in steps or []:
                await send("Runtime.evaluate", expression=js, returnByValue=True)
                t1 = time.time()
                while time.time() - t1 < 1.2:
                    try:
                        msg = json.loads(await asyncio.wait_for(ws.recv(), 0.2)); _collect(msg, errors, logs)
                    except asyncio.TimeoutError: pass
            probed = (await send("Runtime.evaluate", expression=probe, returnByValue=True)).get("result", {}).get("value") if probe else None
            dom = (await send("Runtime.evaluate", expression="document.body.textContent", returnByValue=True)).get("result", {}).get("value", "")
            state = (await send("Runtime.evaluate", expression="(() => { const w = document.querySelector('.canvaswrap'); return w ? w.style.transform : null; })()", returnByValue=True)).get("result", {}).get("value")
            shot = await send("Page.captureScreenshot", format="png")
            open(out, "wb").write(base64.b64decode(shot["data"]))
    finally:
        proc.kill()
    return {"errors": errors, "console": logs, "text": dom, "transform": state, "probe": probed}

def _collect(msg, errors, logs):
    m = msg.get("method"); p = msg.get("params", {})
    if m == "Runtime.exceptionThrown": errors.append(p.get("exceptionDetails", {}).get("exception", {}).get("description", "exception")[:300])
    elif m == "Runtime.consoleAPICalled":
        text = " ".join(str(a.get("value", a.get("description", ""))) for a in p.get("args", []))
        logs.append((p.get("type"), text[:300]))
        if p.get("type") == "error": errors.append(text[:300])
    elif m == "Log.entryAdded":
        e = p.get("entry", {})
        if e.get("level") == "error" and "favicon" not in e.get("text", ""): errors.append(e.get("text", "")[:300])

def main():
    url, out = sys.argv[1], sys.argv[2]; settle = float(sys.argv[3]) if len(sys.argv) > 3 else 4.0
    r = asyncio.run(capture(url, out, settle))
    print(json.dumps({"errors": r["errors"], "transform": r["transform"], "text_head": r["text"][:160].replace("\n", " | ")}))
    sys.exit(1 if r["errors"] else 0)

if __name__ == "__main__":
    main()
