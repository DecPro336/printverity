"""Unit tests run against temporary folders and a local vector store, never against the live job store, output folder,
audit log, pgvector index or reference data (profiles, spec library, PLM register). Set before any app module is imported."""
import atexit, os, shutil, tempfile

_tmp = tempfile.mkdtemp(prefix="pv_unit_")
atexit.register(shutil.rmtree, _tmp, ignore_errors=True)
for key, sub in (("PV_JOBS_DIR", "jobs"), ("PV_OUT_DIR", "out"), ("PV_INDEX_DIR", "index")):
    os.environ[key] = os.path.join(_tmp, sub)
os.environ["PV_AUDIT_FILE"] = os.path.join(_tmp, "audit.jsonl")
# reference data the Setup screen edits: tests work on copies
_data = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data")
shutil.copytree(os.path.join(_data, "profiles"), os.path.join(_tmp, "profiles"))
os.makedirs(os.path.join(_tmp, "specs")); shutil.copy(os.path.join(_data, "specs", "library.json"), os.path.join(_tmp, "specs", "library.json"))
shutil.copy(os.path.join(_data, "plm.json"), os.path.join(_tmp, "plm.json"))
os.environ["PV_PROFILES_DIR"] = os.path.join(_tmp, "profiles")
os.environ["PV_SPEC_LIBRARY"] = os.path.join(_tmp, "specs", "library.json")
os.environ["PV_PLM_FILE"] = os.path.join(_tmp, "plm.json")
os.environ["PV_VECTOR_STORE"] = "local"
os.environ["PV_CELERY"] = "off"

import pytest

@pytest.fixture(scope="session", autouse=True)
def knowledge_index():
    """Build the retrieval index once (specs, rules, standard excerpts, templates), as the server does at startup."""
    from app.retrieval import get_retriever
    get_retriever().refresh([])
