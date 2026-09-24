"""Customer setup from the Setup screen: title-block wording, spec register and released-revision register (tests/conftest.py
points every store at temporary copies)."""
from pathlib import Path
import pytest

ROOT = Path(__file__).resolve().parent.parent
NB = ROOT / "testdata" / "northbay"


def test_guess_field_reads_the_head_word():
    from app.customers import guess_field
    assert [guess_field(t) for t in ("SURFACE TREATMENT", "TREATMENT", "CHANGE ORDER", "DWG SIZE", "APP_BY", "CHK_BY", "BUSHING")] == \
        ["finish", "finish", "eco", "size", "approved", "checked", None]


def test_spec_register_import_makes_customer_specs_checkable():
    from app import customers, dxf_extract, rules
    r = customers.import_specs(customers.read_rows((NB / "customer_setup" / "spec_register.csv").read_bytes(), "spec_register.csv"))
    assert r["imported"] == 1 and not r["errors"]
    s = next(x for x in customers.list_specs() if x["ref"] == "NB-QS-27")
    assert s["current"] == "B" and s["superseded"] == {"A": "2026-05-01"} and s["revisions"] == ["A", "B"]
    assert dxf_extract.find_specs("HARD ANODIZE PER NB-QS-27 REV A, 25-40 MICRON.") == [{"ref": "NB-QS-27", "rev": "A", "text": "HARD ANODIZE PER NB-QS-27 REV A, 25-40 MICRON."}]
    ex = dxf_extract.extract(str(NB / "drawings" / "NB-3120-001_rev2.dxf"))
    assert any(f["rule"] == "SP-02" and "NB-QS-27" in f["title"] for f in rules.run_all(ex))
    assert customers.delete_spec("NB-QS-27") and not any(x["ref"] == "NB-QS-27" for x in customers.list_specs())


def test_revision_register_import_builds_current_and_history():
    from app import customers, dxf_extract, rules
    r = customers.import_revisions(customers.read_rows((NB / "customer_setup" / "released_revisions.csv").read_bytes(), "released_revisions.csv"))
    assert r["imported"] == 6 and not r["errors"]
    rec = next(p for p in customers.list_revisions() if p["part_no"] == "NB-3120-001")
    assert rec["rev"] == "2" and rec["eco"] == "CO-4478" and rec["history"] == [{"rev": "1", "eco": "CO-4410", "released": "2026-02-14"}]
    ex = dxf_extract.extract(str(NB / "drawings" / "NB-3120-001_rev1.dxf"))
    assert any(f["rule"] == "PL-02" for f in rules.run_all(ex))                    # Rev 1 is superseded by the released Rev 2
    for pn in r["parts"]: customers.delete_revision_record(pn)


def test_register_input_errors():
    from app import customers
    with pytest.raises(customers.SetupError): customers.read_rows(b"x", "register.pdf")
    with pytest.raises(customers.SetupError): customers.read_rows(b"Spec,Revision\n", "empty.csv")
    r = customers.import_specs(customers.read_rows(b"Spec,Revision,Status\nQS-9,,current\nQS-9,A,archived\n", "bad.csv"))
    assert r["imported"] == 0 and len(r["errors"]) == 2


def test_save_customer_validates_input():
    from app import customers
    with pytest.raises(customers.SetupError): customers.save_customer("../etc", {"name": "x"})
    with pytest.raises(customers.SetupError): customers.save_customer("acme", {"name": "Other Co", "fields": []})
    with pytest.raises(customers.SetupError): customers.save_customer("acme", {"name": "Acme", "fields": [{"field": "colour"}]})
    with pytest.raises(customers.SetupError): customers.save_customer("acme", {"name": "Acme", "fields": [{"field": "finish", "severity": "urgent"}]})
    c = customers.add_customer("Acme")
    assert c["slug"] == "acme" and c["has_setup"] and not c["jobs"]
    customers.delete_customer("acme")
    with pytest.raises(customers.SetupError): customers.get_customer("acme")


def test_customer_setup_flow_suggests_saves_and_rechecks():
    """Upload -> finish not found -> suggestions from the title blocks -> save -> re-check keeps decisions and reads the finish."""
    from app import customers, store
    from app.tasks.runner import process_job
    j = store.create_job("NB flow", "NorthBay Engineering")
    for f in ("NB-3120-001_rev2.dxf", "NB-3120-001_rev2.pdf"):
        p = store.add_file(j, "drawing", NB / "drawings" / f); j["drawings"].append({"id": "d_" + f, "file": f, "path": p, "status": "pending", "findings": [], "extraction": None, "error": None})
    store.save_job(j); process_job(j["id"])
    c = customers.get_customer("northbay-engineering")
    assert not c["has_setup"] and c["missing"] == {"finish": 2}
    sug = {(s["kind"], s["text"]): s for s in c["suggestions"]}
    assert sug[("label", "SURFACE TREATMENT")]["field"] == "finish" and sug[("label", "SURFACE TREATMENT")]["example"] == "HARD ANODIZE"
    assert sug[("tag", "TREATMENT")]["field"] == "finish"
    # an engineer's decision made before the setup must survive the re-check
    jj = store.get_job(j["id"]); d0 = jj["drawings"][0]; keep = next(f for f in d0["findings"] if f["rule"] == "GD-01")
    keep["status"], keep["note"] = "accepted", "sent to drafter"; store.save_job(jj)
    fields = c["fields"]
    for s in c["suggestions"]:
        if s["field"]: next(f for f in fields if f["field"] == s["field"])["labels" if s["kind"] == "label" else "tags"].append(s["text"])
    saved = customers.save_customer("northbay-engineering", {"name": "NorthBay Engineering", "fields": fields})
    assert saved["has_setup"]
    process_job(j["id"], recheck=True)
    after = customers.get_customer("northbay-engineering")
    assert after["missing"] == {} and not [s for s in after["suggestions"] if s["field"] == "finish"]
    jj = store.get_job(j["id"])
    for d in jj["drawings"]:
        assert d["extraction"]["title_block"]["fields"]["finish"]["value"] == "HARD ANODIZE" and not any(f["rule"] == "TB-01" for f in d["findings"])
    assert any(f["rule"] == "GD-01" and f["status"] == "accepted" and f["note"] == "sent to drafter" for f in jj["drawings"][0]["findings"])
    customers.delete_customer("northbay-engineering"); store.delete_job(j["id"])
