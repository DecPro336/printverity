"""Typed state shared by the graph nodes."""
from __future__ import annotations
from typing import TypedDict, Any

class StepTrace(TypedDict):
    node: str
    status: str          # ok | skipped | error
    ms: float
    detail: str

class ReviewState(TypedDict, total=False):
    path: str
    profile: str
    kind: str                       # dxf | pdf | raster | dwg | unsupported
    drawing: dict[str, Any]         # the drawing record being built
    extraction: dict[str, Any]
    findings: list[dict[str, Any]]
    context: list[dict[str, Any]]   # retrieval hits attached to findings
    error: str | None
    trace: list[StepTrace]
