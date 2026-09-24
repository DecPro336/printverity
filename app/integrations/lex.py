"""Amazon Lex V2 channel. `fulfillment_handler` is the Lambda entry point for the bot's fulfillment hook; it forwards the utterance to the PrintVerity agent.
`/api/channels/lex` accepts the same event shape so the channel can be exercised without AWS."""
from __future__ import annotations
import json, os, urllib.request

def _answer(job_id: str, question: str) -> dict:
    api = os.environ.get("PV_API_URL", "http://127.0.0.1:8710")
    req = urllib.request.Request(f"{api}/api/jobs/{job_id}/ask", data=json.dumps({"question": question}).encode(), headers={"content-type": "application/json"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read().decode())

def lex_response(event: dict, text: str, state: str = "Fulfilled") -> dict:
    intent = (event.get("sessionState") or {}).get("intent") or {"name": "AskDrawing"}
    intent = dict(intent); intent["state"] = state
    return {"sessionState": {"dialogAction": {"type": "Close"}, "intent": intent, "sessionAttributes": (event.get("sessionState") or {}).get("sessionAttributes") or {}},
            "messages": [{"contentType": "PlainText", "content": text[:2000]}]}

def handle_event(event: dict, ask) -> dict:
    """Shared logic: `ask(job_id, question) -> dict` is injected so the API can call the agent in-process."""
    attrs = (event.get("sessionState") or {}).get("sessionAttributes") or {}
    slots = ((event.get("sessionState") or {}).get("intent") or {}).get("slots") or {}
    job_id = attrs.get("job") or ((slots.get("job") or {}).get("value") or {}).get("interpretedValue")
    question = event.get("inputTranscript") or ((slots.get("question") or {}).get("value") or {}).get("interpretedValue") or ""
    if not job_id:
        return lex_response(event, "Which job should I look at? Say the job number.", "Failed")
    if not question.strip():
        return lex_response(event, "What would you like to know about the drawing package?", "Failed")
    try:
        r = ask(job_id, question)
        text = r["answer"] + (f"  Sources: {', '.join(r['citations'][:3])}" if r.get("citations") else "")
        return lex_response(event, text)
    except Exception as e:
        return lex_response(event, f"I could not answer that: {e}", "Failed")

def fulfillment_handler(event, context=None):
    """AWS Lambda handler."""
    return handle_event(event, lambda job, q: _answer(job, q))
