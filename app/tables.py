"""Read BOM / PO / parts-list style tables from xlsx or csv into normalized rows."""
import csv, re
from pathlib import Path
import openpyxl

COLS = {
    "item": ["item", "item no", "no", "#", "line", "pos", "position", "find no"],
    "qty": ["qty", "quantity", "qty.", "qty per", "each", "quantity ordered", "order qty"],
    "part_no": ["part no", "part number", "part no.", "p/n", "pn", "part", "component", "item number", "material number", "dwg no", "drawing no"],
    "description": ["description", "desc", "title", "name", "part name"],
    "material": ["material", "matl", "mat'l", "mat"],
    "rev": ["rev", "revision", "rev.", "drawing rev"],
    "finish": ["finish", "coating", "surface"],
    "unit_price": ["unit price", "price", "unit cost"],
    "supplier": ["supplier", "vendor", "mfr", "manufacturer"],
}
def _norm(h):
    return re.sub(r"[^a-z0-9/#'. ]", "", str(h or "").strip().lower())

def _map_header(row):
    m = {}
    for i, h in enumerate(row):
        n = _norm(h)
        if not n: continue
        for field, names in COLS.items():
            if n in names and field not in m:
                m[field] = i; break
        else:
            for field, names in COLS.items():
                if field not in m and any(n.startswith(x) for x in names if len(x) > 2):
                    m[field] = i; break
    return m

def read_table(path):
    path = str(path)
    rows = []
    if path.lower().endswith((".xlsx", ".xlsm", ".xltx")):
        wb = openpyxl.load_workbook(path, data_only=True, read_only=True)
        ws = wb.active
        for r in ws.iter_rows(values_only=True):
            rows.append(["" if v is None else v for v in r])
    else:
        with open(path, newline="", encoding="utf-8-sig") as f:
            sample = f.read(4096); f.seek(0)
            try: dialect = csv.Sniffer().sniff(sample, delimiters=",;\t")
            except Exception: dialect = csv.excel
            rows = [r for r in csv.reader(f, dialect)]
    meta = {}
    header_idx = None; mapping = {}
    for i, r in enumerate(rows[:30]):
        m = _map_header(r)
        if "part_no" in m and ("qty" in m or "description" in m):
            header_idx = i; mapping = m; break
        # key/value metadata rows above the table (PO number, supplier, date)
        cells = [str(c).strip() for c in r if str(c).strip()]
        if len(cells) >= 2 and len(cells[0]) < 30:
            meta[_norm(cells[0]).rstrip(":")] = cells[1]
    out = []
    if header_idx is None:
        return {"rows": [], "meta": meta, "columns": [], "error": "No header row with a part number column was found"}
    for r in rows[header_idx + 1:]:
        if not any(str(c).strip() for c in r): continue
        rec = {}
        for field, idx in mapping.items():
            v = r[idx] if idx < len(r) else ""
            if isinstance(v, float) and v.is_integer(): v = int(v)
            rec[field] = str(v).strip()
        if not rec.get("part_no"): continue
        try: rec["qty_n"] = float(str(rec.get("qty", "")).replace(",", "."))
        except ValueError: rec["qty_n"] = None
        out.append(rec)
    return {"rows": out, "meta": meta, "columns": list(mapping.keys()), "source": Path(path).name}
