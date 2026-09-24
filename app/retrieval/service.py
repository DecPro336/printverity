"""Retriever facade used by the rules (spec suggestions), the Q&A agent (knowledge tool) and the local answer mode."""
from __future__ import annotations
import logging, threading
from .embeddings import get_embedder
from .store import open_store, Hit
from . import index as idx

log = logging.getLogger("printverity.retrieval")

# Set except while the server's startup warm-up is building the index. Searches wait for it (bounded), so the first review
# after a start on a fresh install still gets its retrieved references instead of an empty index.
WARMED = threading.Event(); WARMED.set()
WARMUP_WAIT_S = 180

class Retriever:
    def __init__(self):
        self.embedder = get_embedder()
        self.store = open_store(self.embedder.dim)
        self._lock = threading.Lock()
    @property
    def info(self):
        return {"embeddings": self.embedder.name, "dim": self.embedder.dim, "store": self.store.name, "documents": self.store.count()}
    def refresh(self, jobs: list[dict]) -> int:
        """Re-embed and upsert every knowledge document. Cheap at this scale; runs at startup and after each decision."""
        docs = idx.all_documents(jobs)
        with self._lock:
            vecs = self.embedder.embed([f"{d.title}. {d.text}" for d in docs])
            for d, v in zip(docs, vecs): d.vector = v
            n = self.store.upsert(docs)
        log.info("retrieval index refreshed: %d documents", n)
        return n
    def search(self, query: str, k: int = 6, kinds: list[str] | None = None) -> list[Hit]:
        WARMED.wait(WARMUP_WAIT_S)
        with self._lock:
            v = self.embedder.embed([query])[0]
            return self.store.search(v, k=k, kinds=kinds)
    def search_many(self, queries: list[str], k: int = 2, kinds: list[str] | None = None) -> list[list[Hit]]:
        """One embedding call for many queries (the enrich node asks once per finding)."""
        if not queries: return []
        WARMED.wait(WARMUP_WAIT_S)
        with self._lock:
            vecs = self.embedder.embed(queries)
            return [self.store.search(v, k=k, kinds=kinds) for v in vecs]
    def nearest_spec(self, ref: str) -> Hit | None:
        hits = self.search(ref, k=1, kinds=["spec"])
        return hits[0] if hits and hits[0].score > 0.45 else None

_retriever: Retriever | None = None
_retriever_lock = threading.Lock()
def get_retriever() -> Retriever:
    """One retriever per process. Locked: the start-up warm-up and the first request must not each build their own
    (each would load the model, and a local store opened before the warm-up wrote it would stay empty)."""
    global _retriever
    if _retriever is None:
        with _retriever_lock:
            if _retriever is None: _retriever = Retriever()
    return _retriever
