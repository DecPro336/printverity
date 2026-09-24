"""Unit tests for the extraction, rules, comparison, consistency, STEP and document modules. Run: .venv/bin/python -m pytest -q"""
import sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
import pytest
from app import dxf_extract, pdf_extract, rules, compare, consistency, docs, tables, patterns as P
from app.geometry import step_text
from app.orchestration import run_review as review_file
REF = ROOT / "testdata" / "reference"; DW = REF / "drawings"; DOC = REF / "documents"   # the reference test package

@pytest.fixture(scope="module")
def bracket_d(): return dxf_extract.extract(str(DW / "4471-020_D.dxf"))
@pytest.fixture(scope="module")
def bracket_c(): return dxf_extract.extract(str(DW / "4471-020_C.dxf"))
@pytest.fixture(scope="module")
def shaft(): return dxf_extract.extract(str(DW / "4471-105_B.dxf"))
@pytest.fixture(scope="module")
def assy(): return dxf_extract.extract(str(DW / "4471-000_B.dxf"))
@pytest.fixture(scope="module")
def bracket_pdf(): return pdf_extract.extract(str(DW / "4471-020_D.pdf"))

def titles(ex): return [f["title"] for f in rules.run_all(ex)]

# ---------------- extraction
def test_title_block_from_attributes(bracket_d):
    tb = bracket_d["title_block"]["fields"]
    assert tb["part_no"]["value"] == "4471-020" and tb["rev"]["value"] == "D" and tb["checked"]["value"] == ""
    assert tb["part_no"]["source"].startswith("attrib")

def test_title_block_from_label_proximity(shaft):
    tb = shaft["title_block"]["fields"]
    assert tb["part_no"]["value"] == "4471-105" and tb["eco"]["value"] == "ECO-2299" and tb["part_no"]["source"] == "label proximity"

def test_dimensions_and_tolerances(bracket_d):
    d = {x["text"]: x for x in bracket_d["dimensions"]}
    assert d["120 ±0.1"]["tol"] == {"plus": 0.1, "minus": 0.1} and d["120 ±0.1"]["value"] == 120.0

def test_fcf_and_datums(bracket_d):
    f = bracket_d["fcfs"][0]
    assert f["symbol"] == "position" and f["tolerance"] == 0.25 and f["diameter"] and f["modifiers"] == ["M"] and f["datums"] == ["A", "B"]
    assert [d["id"] for d in bracket_d["datums"]] == ["A"]

def test_thread_leader_association(bracket_d):
    th = bracket_d["threads"][0]
    assert th["spec"] == "M6x1.0" and th["tap_drill"] == 5.0 and th["circle"]["via"] == "leader" and abs(th["circle"]["r"] - 3.3) < 1e-6

def test_parts_list_and_balloons(assy):
    assert [r["part_no"] for r in assy["parts_list"]["rows"]][:3] == ["4471-020", "4471-105", "4471-108"]
    assert sorted(b["n"] for b in assy["balloons"]) == [1, 2, 3, 4, 5, 6, 8]

def test_tolerance_content_parser():
    p = dxf_extract.parse_tolerance_content("{\\Fgdt;h}%%v0.02%%vA-B")
    assert p["symbol"] == "circular runout" and p["tolerance"] == 0.02 and p["datums"] == ["A", "B"]
    assert dxf_extract.parse_tolerance_content("A")["datum_id"] == "A"

def test_thread_parser():
    assert dxf_extract.parse_thread("M6x1.0-6H")["tap_drill"] == 5.0
    assert dxf_extract.parse_thread("SCREW SHCS M6X16")["pitch"] == 1.0          # length, not pitch
    assert dxf_extract.parse_thread("1/4-20 UNC")["tap_drill"] == 0.201
    assert dxf_extract.parse_thread("ITEM 5") is None

def test_pdf_matches_dxf(bracket_d, bracket_pdf):
    assert bracket_pdf["title_block"]["fields"]["part_no"]["value"] == "4471-020"
    assert bracket_pdf["fcfs"][0]["datums"] == ["A", "B"] and [d["id"] for d in bracket_pdf["datums"]] == ["A"]
    assert bracket_pdf["source"]["scale"] == 1.0 and bracket_pdf["threads"][0]["circle"]["via"] == "leader"
    assert set(titles(bracket_pdf)) <= set(titles(bracket_d)) | {"Thread callout M6x1.0 on a Ø6.6 hole, larger than the thread major diameter"}

def test_paperspace_layout():
    ex = dxf_extract.extract(str(DW / "4471-020_D_layout.dxf"))
    assert ex["space"] == "paper:Layout1" and ex["viewports"] and ex["title_block"]["fields"]["part_no"]["value"] == "4471-020"
    assert any(f["loc"] and f["loc"][2] == "model" for f in rules.run_all(ex))

# ---------------- rules
def test_rules_bracket(bracket_d):
    t = titles(bracket_d)
    assert any("Datum B referenced" in x for x in t) and any("Duplicated dimension 46" in x for x in t)
    assert any("QS-114 Rev B is superseded" in x for x in t) and any("CHECKED field is blank" in x for x in t)

def test_rules_shaft(shaft):
    t = titles(shaft)
    assert any("545" in x and "540" in x for x in t) and any("ECO-2299" in x for x in t) and any("KEYWAY" in x for x in t)
    assert not any("Chain of dimensions" in x for x in t)   # suppressed: same root cause as the override finding

def test_rules_assembly(assy):
    t = titles(assy)
    assert any("Balloon 8" in x for x in t) and any("ITEM 9" in x for x in t) and any("DETAIL B" in x for x in t)

def test_rules_isolated_on_bad_input():
    assert rules.run_all({"source": {"kind": "dxf", "units": "mm"}}) == [] or True   # must not raise
    fs = rules.run_all({"source": {"kind": "dxf", "units": "mm"}, "texts": [], "title_block": {"fields": {}}})
    assert any(f["rule"] == "TB-00" for f in fs)

def test_rule_catalogue_ids_match_code():
    ids = {r[0] for r in rules.RULES}
    src = (ROOT / "app" / "rules.py").read_text()
    import re
    used = set(re.findall(r'"([A-Z]{2}-\d{2})"', src))
    assert used <= ids | {"CR-01", "CR-02"}

# ---------------- compare / consistency / step / docs
def test_compare(bracket_c, bracket_d):
    r = compare.compare(bracket_c, bracket_d, "C", "D")
    assert r["summary"]["total"] == 14 and r["eco"]["status"] == "match"
    assert any(c["kind"] == "Dimension" and c["change"] == "tolerance" and c["impact"] == "Inspection" for c in r["changes"])

def test_consistency(assy, bracket_d, shaft):
    ds = [{"file": "a.dxf", "extraction": assy}, {"file": "b.dxf", "extraction": bracket_d}, {"file": "s.dxf", "extraction": shaft}]
    r = consistency.check(None, ds, str(DOC / "BOM_4471-000_rev3.xlsx"), str(DOC / "PO_88213.xlsx"))
    assert r["conflicts"] == 4 and any(x["label"] == "Qty mismatch" for x in r["rows"])

def test_consistency_one_copy_per_part(assy, bracket_d, bracket_c, shaft):
    """Old revision, PDF plot and scan of the same part in one package must not repeat the conflicts."""
    ds = [{"file": "a.dxf", "kind": "dxf", "extraction": assy}, {"file": "b_c.dxf", "kind": "dxf", "extraction": bracket_c},
          {"file": "b.pdf", "kind": "pdf", "extraction": bracket_d}, {"file": "b.dxf", "kind": "dxf", "extraction": bracket_d}, {"file": "s.dxf", "kind": "dxf", "extraction": shaft}]
    r = consistency.check(None, ds, str(DOC / "BOM_4471-000_rev3.xlsx"), str(DOC / "PO_88213.xlsx"))
    assert r["conflicts"] == 4 and sum(x.startswith("Skipped:") for x in r["sources"]) == 2 and any("b.dxf (4471-020 Rev D)" in x for x in r["sources"])

def test_table_reader_csv(tmp_path):
    p = tmp_path / "bom.csv"; p.write_text("Item,Qty,Part No,Description,Rev\n1,2,4471-108,BUSHING,A\n")
    t = tables.read_table(str(p)); assert t["rows"][0]["part_no"] == "4471-108" and t["rows"][0]["qty_n"] == 2.0

def test_step(bracket_d):
    st = step_text.parse(str(DOC / "4471-020_D.stp"))
    assert st["units"] == "mm" and st["extents"]["x"] == 120.0
    cc = step_text.cross_check(st, bracket_d); assert cc["conflicts"] == 1 and cc["rows"][0]["status"] == "size"

def test_docs(bracket_d, tmp_path):
    d = {"file": "4471-020_D.dxf", "extraction": bracket_d}
    ip = docs.fill_inspection_plan(d, {"name": "T"}); assert ip["rows"] >= 8 and Path(ip["path"]).exists()
    r = docs.bulk_edit("QS-114 Rev B", "QS-114 Rev D", preview_only=True); assert r["total"] == 5 and not r["files"]

def test_profiles():
    assert P.load_profile("no such customer") == "default" and "PART NO" in P.TITLE_LABELS["part_no"]
    P.load_profile("default")

def test_pipeline_declines_dwg(tmp_path):
    p = tmp_path / "x.dwg"; p.write_bytes(b"AC1032" + b"\x00" * 100)
    r = review_file(str(p)); assert r["error"] and "DXF" in r["error"] and r["findings"] == []
