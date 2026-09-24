"""Turns the knowledge sources into Documents: spec library, customer rules, drawing-standard excerpts, past accepted findings, templates."""
from __future__ import annotations
from pathlib import Path
from .store import Document
from ..util import load_json, SPEC_LIBRARY
from .. import config

def spec_documents(library: dict) -> list[Document]:
    docs = []
    for s in library.get("specs", []):
        sup = ", ".join(f"Rev {k} superseded {v}" for k, v in (s.get("superseded") or {}).items()) or "no superseded revisions"
        text = f"{s['ref']}: {s.get('title', '')}. Current revision {s.get('current')}. Known revisions {', '.join(s.get('revisions', []))}. {sup}. {'On file' if s.get('on_file') else 'Not on file'}."
        docs.append(Document(id=f"spec:{s['ref']}", kind="spec", title=s["ref"], text=text, metadata={"ref": s["ref"], "current": s.get("current"), "on_file": s.get("on_file", False)}))
    for r in library.get("customer_rules", []):
        docs.append(Document(id=f"rule:{r['id']}", kind="rule", title=r["id"], text=r["text"], metadata={"pattern": r.get("pattern")}))
    return docs

def standard_documents(path: Path) -> list[Document]:
    data = load_json(path, {"excerpts": []})
    return [Document(id=f"std:{e['id']}", kind="standard", title=f"{e['standard']} {e['clause']}", text=e["text"], metadata={"standard": e["standard"], "clause": e["clause"]}) for e in data.get("excerpts", [])]

def finding_documents(jobs: list[dict]) -> list[Document]:
    """Accepted findings become precedent: the same problem on the next drawing retrieves how it was judged."""
    docs = []
    for j in jobs:
        for d in j.get("drawings", []):
            for f in d.get("findings", []):
                if f.get("status") not in ("accepted", "rejected"): continue
                text = f"{f['title']}. {f['detail']} Decision: {f['status']}" + (f". Note: {f['note']}" if f.get("note") else "")
                docs.append(Document(id=f"finding:{f['id']}", kind="finding", title=f"{d.get('part_no') or d['file']} Rev {d.get('rev') or '-'}: {f['title']}", text=text,
                                     metadata={"job": j["id"], "drawing": d["id"], "part_no": d.get("part_no"), "rule": f.get("rule"), "status": f["status"], "severity": f["severity"]}))
    return docs

def template_documents(templates_dir: Path) -> list[Document]:
    docs = []
    for p in sorted(templates_dir.glob("*")):
        if p.suffix.lower() not in (".docx", ".xlsx"): continue
        text = ""
        try:
            if p.suffix.lower() == ".docx":
                import docx
                d = docx.Document(p); text = "\n".join(x.text for x in d.paragraphs if x.text.strip())[:2000]
            else:
                import openpyxl
                wb = openpyxl.load_workbook(p, read_only=True); ws = wb.active
                text = "\n".join(" ".join(str(c) for c in row if c) for row in ws.iter_rows(values_only=True, max_row=40))[:2000]
        except Exception: continue
        docs.append(Document(id=f"template:{p.name}", kind="template", title=p.name, text=text, metadata={"file": p.name}))
    return docs

def all_documents(jobs: list[dict]) -> list[Document]:
    lib = load_json(SPEC_LIBRARY, {"specs": [], "customer_rules": []})
    return spec_documents(lib) + standard_documents(config.DATA_DIR / "specs" / "y14_5_excerpts.json") + finding_documents(jobs) + template_documents(config.DATA_DIR / "templates")
