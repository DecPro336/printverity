"""Epicor Kinetic REST (OData v2) client for part revisions, ECOs and purchase orders, with the local PLM file as the offline stand-in.
Configure EPICOR_BASE_URL (…/api/v2/odata/<Company>) and EPICOR_API_KEY (or user/password)."""
from __future__ import annotations
import base64, json, logging, urllib.request, urllib.parse, urllib.error, time
from .. import config
from ..util import load_json, PLM_FILE

log = logging.getLogger("printverity.epicor")

class EpicorClient:
    def __init__(self, base_url=config.EPICOR_BASE_URL, api_key=config.EPICOR_API_KEY, user=config.EPICOR_USER, password=config.EPICOR_PASSWORD, timeout=8):
        self.base = base_url.rstrip("/"); self.timeout = timeout
        self.headers = {"Accept": "application/json", "Content-Type": "application/json"}
        if api_key: self.headers["x-api-key"] = api_key
        if user: self.headers["Authorization"] = "Basic " + base64.b64encode(f"{user}:{password}".encode()).decode()
        self._cache: dict[str, tuple[float, dict]] = {}
    @property
    def configured(self) -> bool:
        return bool(self.base)
    def _get(self, service: str, params: dict | None = None) -> dict:
        key = service + json.dumps(params or {}, sort_keys=True)
        hit = self._cache.get(key)
        if hit and time.time() - hit[0] < 300: return hit[1]
        url = f"{self.base}/{service}" + (("?" + urllib.parse.urlencode(params)) if params else "")
        req = urllib.request.Request(url, headers=self.headers)
        with urllib.request.urlopen(req, timeout=self.timeout) as r:
            data = json.loads(r.read().decode())
        self._cache[key] = (time.time(), data); return data
    def part_revision(self, part_no: str) -> dict | None:
        """Latest approved revision of a part: Erp.BO.PartSvc/PartRevs."""
        data = self._get("Erp.BO.PartSvc/PartRevs", {"$filter": f"PartNum eq '{part_no}' and Approved eq true", "$orderby": "ApprovedDate desc", "$top": 5})
        rows = data.get("value", [])
        if not rows: return None
        top = rows[0]
        return {"rev": top.get("RevisionNum"), "eco": top.get("ECOGroup") or top.get("ECO") or None, "released": (top.get("ApprovedDate") or "")[:10], "title": top.get("RevDescription") or top.get("PartDescription"),
                "history": [{"rev": r.get("RevisionNum"), "eco": r.get("ECOGroup"), "released": (r.get("ApprovedDate") or "")[:10]} for r in rows[1:]]}
    def purchase_order(self, po_num: str) -> list[dict]:
        data = self._get("Erp.BO.POSvc/PODetails", {"$filter": f"PONUM eq {int(po_num)}"})
        return [{"line": r.get("POLine"), "part_no": r.get("PartNum"), "rev": r.get("RevisionNum"), "qty": r.get("OrderQty"), "description": r.get("LineDesc")} for r in data.get("value", [])]

class LocalPlm:
    """Offline PLM: data/plm.json."""
    def __init__(self, path=PLM_FILE):
        self.path = path
    @property
    def configured(self) -> bool: return True
    def part_revision(self, part_no: str) -> dict | None:
        return load_json(self.path, {"parts": {}}).get("parts", {}).get(part_no)
    def purchase_order(self, po_num: str) -> list[dict]:
        return []

class PlmService:
    """Epicor when configured and reachable; local file otherwise. Every call reports which source answered."""
    def __init__(self):
        self.epicor = EpicorClient(); self.local = LocalPlm()
    @property
    def source(self) -> str:
        return "epicor" if self.epicor.configured else "local"
    def part_revision(self, part_no: str) -> tuple[dict | None, str]:
        if self.epicor.configured:
            try: return self.epicor.part_revision(part_no), "epicor"
            except Exception as e: log.warning("Epicor unavailable (%s); using local PLM", str(e)[:100])
        return self.local.part_revision(part_no), "local"
    def parts(self) -> dict:
        return load_json(self.local.path, {"parts": {}}).get("parts", {})

_plm: PlmService | None = None
def get_plm() -> PlmService:
    global _plm
    if _plm is None: _plm = PlmService()
    return _plm
