"""Package-level reports computed from a job's files: cross-document consistency and drawing vs model."""
from __future__ import annotations
import logging, traceback
from pathlib import Path
from . import consistency
from .geometry import parse_step, cross_check

log = logging.getLogger("printverity.reports")

def run_reports(j: dict) -> None:
    try:
        if j["files"].get("bom") or j["files"].get("po"):
            j["consistency"] = consistency.check(j, j["drawings"], j["files"].get("bom"), j["files"].get("po"))
        else:
            j["consistency"] = None
    except Exception as e:
        log.error("consistency: %s", traceback.format_exc()); j["consistency"] = {"rows": [], "conflicts": 0, "sources": [], "errors": [str(e)]}
    try:
        if j["files"].get("step"):
            st = parse_step(j["files"]["step"])
            prod = (st.get("product") or "").strip().upper().replace(" ", "")
            per = []
            for d in j["drawings"]:
                if not d.get("extraction"): continue
                pn = (d.get("part_no") or "").strip().upper().replace(" ", "")
                if prod and pn and prod != pn and not (prod.startswith(pn) or pn.startswith(prod)):
                    per.append({"drawing": d["id"], "file": d["file"], "rows": [], "matches": 0, "conflicts": 0, "skipped": f"Model product is {st.get('product')}; this drawing is {d.get('part_no')}. Attach that part's STEP to check it."})
                    continue
                cc = cross_check(st, d["extraction"]); cc["drawing"] = d["id"]; cc["file"] = d["file"]; per.append(cc)
            j["model_check"] = {"model": {"file": Path(j["files"]["step"]).name, "product": st.get("product"), "units": st.get("units"), "cylinders": st.get("cylinders"), "extents": st.get("extents"),
                                          "schema": st.get("schema"), "engine": st.get("engine"), "volume_mm3": st.get("volume_mm3"), "faces": st.get("faces")}, "drawings": per}
        else:
            j["model_check"] = None
    except Exception as e:
        log.error("model check: %s", traceback.format_exc()); j["model_check"] = {"error": str(e), "drawings": []}
