"""Embedding providers behind one interface. Preference order (auto): Voyage AI (Anthropic's recommended embeddings) -> local sentence-transformers -> hashed n-grams.
The hashed embedder needs no model or network; it exists so retrieval never disappears, only degrades."""
from __future__ import annotations
import hashlib, math, logging, os, re, threading
from typing import Protocol, Sequence
from .. import config

log = logging.getLogger("printverity.retrieval")

class Embedder(Protocol):
    name: str
    dim: int
    def embed(self, texts: Sequence[str]) -> list[list[float]]: ...

class VoyageEmbedder:
    name = "voyage"
    def __init__(self, model: str = config.VOYAGE_MODEL):
        import voyageai
        self.client = voyageai.Client()     # reads VOYAGE_API_KEY
        self.model = model
        self.dim = len(self.embed(["dimension check"])[0])
    def embed(self, texts):
        out = []
        for i in range(0, len(texts), 96):
            out.extend(self.client.embed(list(texts[i:i + 96]), model=self.model, input_type="document").embeddings)
        return [list(map(float, v)) for v in out]

class LocalSentenceEmbedder:
    name = "local"
    def __init__(self, model: str = config.LOCAL_EMBED_MODEL):
        from sentence_transformers import SentenceTransformer
        self.model = SentenceTransformer(model, device="cpu")
        dim_of = getattr(self.model, "get_embedding_dimension", None) or self.model.get_sentence_embedding_dimension   # renamed in sentence-transformers 6
        self.dim = int(dim_of())
    def embed(self, texts):
        vs = self.model.encode(list(texts), normalize_embeddings=True, batch_size=32, show_progress_bar=False)
        return [list(map(float, v)) for v in vs]

class HashEmbedder:
    """Character-trigram feature hashing into a fixed-size normalized vector. Deterministic, dependency-free."""
    name = "hash"
    def __init__(self, dim: int = 384):
        self.dim = dim
    def _vec(self, text):
        v = [0.0] * self.dim
        t = re.sub(r"\s+", " ", text.lower())
        toks = t.split()
        grams = [f" {w} " for w in toks] + [t[i:i + 3] for i in range(max(0, len(t) - 2))]
        for g in grams:
            h = int(hashlib.blake2b(g.encode(), digest_size=8).hexdigest(), 16)
            v[h % self.dim] += 1.0 if (h >> 63) else -1.0
        n = math.sqrt(sum(x * x for x in v)) or 1.0
        return [x / n for x in v]
    def embed(self, texts):
        return [self._vec(t) for t in texts]

_cached: Embedder | None = None

_embedder_lock = threading.Lock()

def get_embedder() -> Embedder:
    """The process-wide embedder, built once (locked: model loading is slow and must not run twice in parallel)."""
    if _cached: return _cached
    with _embedder_lock:
        return _cached or _build_embedder()

def _build_embedder() -> Embedder:
    global _cached
    pref = config.EMBEDDINGS_PROVIDER
    order = {"voyage": ["voyage"], "local": ["local"], "hash": ["hash"]}.get(pref, ["voyage", "local", "hash"])
    for name in order:
        try:
            if name == "voyage" and os.environ.get("VOYAGE_API_KEY"):
                _cached = VoyageEmbedder(); break
            if name == "local":
                _cached = LocalSentenceEmbedder(); break
            if name == "hash":
                _cached = HashEmbedder(); break
        except Exception as e:
            log.info("embedder %s unavailable: %s", name, str(e)[:120])
    if _cached is None: _cached = HashEmbedder()
    log.info("embeddings: %s (dim %d)", _cached.name, _cached.dim)
    return _cached
