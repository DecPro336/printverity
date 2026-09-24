"""Runtime settings. Every value has a working default for a single-machine install; production values come from the environment (PV_* / provider keys)."""
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

def _load_dotenv(path: Path) -> None:
    """KEY=value lines from .env, without overriding variables already set in the environment."""
    if not path.exists(): return
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line: continue
        k, v = line.split("=", 1); k = k.strip(); v = v.strip().strip('"').strip("'")
        os.environ.setdefault(k, v)
_load_dotenv(ROOT / ".env")

def _int(name, default):
    try: return int(os.environ.get(name, default))
    except ValueError: return default

def _bool(name, default=False):
    return os.environ.get(name, "1" if default else "0").lower() in ("1", "true", "yes", "on")

# --- storage and limits
DATA_DIR = Path(os.environ.get("PV_DATA_DIR", ROOT / "data"))
MAX_UPLOAD_MB = _int("PV_MAX_UPLOAD_MB", 60)
DRAWING_EXT = {".dxf", ".pdf", ".dwg", ".png", ".jpg", ".jpeg", ".tif", ".tiff"}
STEP_EXT = {".stp", ".step"}
TABLE_EXT = {".xlsx", ".xlsm", ".csv", ".tsv"}
AUDIO_EXT = {".m4a", ".mp3", ".wav", ".ogg", ".webm", ".aac", ".flac"}
RENDER_CACHE_SIZE = _int("PV_RENDER_CACHE", 64)
PDF_RENDER_DPI = _int("PV_PDF_DPI", 150)
DEFAULT_PROFILE = os.environ.get("PV_PROFILE", "default")
LOG_REQUESTS = _bool("PV_LOG_REQUESTS")

# --- remote access: when PV_ACCESS_TOKEN is set, every request needs the token (cookie set by /api/login, or X-Access-Token header)
ACCESS_TOKEN = os.environ.get("PV_ACCESS_TOKEN", "")
HOST = os.environ.get("PV_HOST", "127.0.0.1")

# --- language model (Anthropic)
CLAUDE_MODEL = os.environ.get("PV_CLAUDE_MODEL", "claude-opus-5")
AGENT_MAX_STEPS = _int("PV_AGENT_MAX_STEPS", 8)

# --- retrieval (RAG): embeddings + vector store
EMBEDDINGS_PROVIDER = os.environ.get("PV_EMBEDDINGS", "auto")          # auto | voyage | local | hash
VOYAGE_MODEL = os.environ.get("PV_VOYAGE_MODEL", "voyage-3.5-lite")
LOCAL_EMBED_MODEL = os.environ.get("PV_LOCAL_EMBED_MODEL", "sentence-transformers/all-MiniLM-L6-v2")
DATABASE_URL = os.environ.get("DATABASE_URL", "postgresql://printverity:printverity@127.0.0.1:5432/printverity")
VECTOR_STORE = os.environ.get("PV_VECTOR_STORE", "auto")               # auto | pgvector | local
INDEX_DIR = Path(os.environ.get("PV_INDEX_DIR", DATA_DIR / "index"))     # local vector store (used when pgvector is not available)

# --- background processing (Celery on Redis)
REDIS_URL = os.environ.get("REDIS_URL", "redis://127.0.0.1:6379/0")
CELERY_MODE = os.environ.get("PV_CELERY", "auto")                      # auto | on | off

# --- vision (raster drawings)
LAYOUT_MODEL_PATH = Path(os.environ.get("PV_LAYOUT_MODEL", DATA_DIR / "models" / "layout.pt"))
OCR_ENGINE = os.environ.get("PV_OCR", "auto")                          # auto | tesseract | paddle
OCR_LANG = os.environ.get("PV_OCR_LANG", "eng")
RASTER_DPI = _int("PV_RASTER_DPI", 300)

# --- integrations
EPICOR_BASE_URL = os.environ.get("EPICOR_BASE_URL", "")                # e.g. https://erp.example.com/EpicorERP/api/v2/odata/COMPANY
EPICOR_API_KEY = os.environ.get("EPICOR_API_KEY", "")
EPICOR_USER = os.environ.get("EPICOR_USER", ""); EPICOR_PASSWORD = os.environ.get("EPICOR_PASSWORD", "")
S3_BUCKET = os.environ.get("PV_S3_BUCKET", "")
S3_PREFIX = os.environ.get("PV_S3_PREFIX", "printverity/")
AWS_REGION = os.environ.get("AWS_REGION", "us-east-1")
ASSEMBLYAI_API_KEY = os.environ.get("ASSEMBLYAI_API_KEY", "")
IMAGE_API_KEY = os.environ.get("OPENAI_API_KEY", "")                   # optional AI illustration provider
IMAGE_MODEL = os.environ.get("PV_IMAGE_MODEL", "gpt-image-1")
