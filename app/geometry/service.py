"""Chooses the STEP engine: OpenCascade when the OCP bindings import, otherwise the dependency-free text parser. Same output shape either way."""
from __future__ import annotations
import logging
from . import step_occ, step_text

log = logging.getLogger("printverity.geometry")

def engine_name() -> str:
    return "opencascade" if step_occ.available() else "text-parser"

def parse_step(path: str) -> dict:
    if step_occ.available():
        try:
            return step_occ.parse(path)
        except Exception as e:
            log.warning("OpenCascade failed on %s (%s); falling back to text parser", path, str(e)[:100])
    out = step_text.parse(path); out["engine"] = "text-parser"
    return out

def cross_check(step: dict, extraction: dict) -> dict:
    return step_text.cross_check(step, extraction)
