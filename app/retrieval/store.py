"""Vector stores behind one interface: pgvector on PostgreSQL for production, a local NumPy store for single-machine use."""
from __future__ import annotations
import json, logging
from dataclasses import dataclass, field, asdict
from pathlib import Path
from typing import Iterable
from .. import config

log = logging.getLogger("printverity.retrieval")

@dataclass
class Document:
    id: str
    kind: str                 # spec | rule | standard | finding | template
    title: str
    text: str
    metadata: dict = field(default_factory=dict)
    vector: list[float] | None = None

@dataclass
class Hit:
    id: str
    kind: str
    title: str
    text: str
    metadata: dict
    score: float

class VectorStore:
    name = "base"
    def upsert(self, docs: Iterable[Document]) -> int: raise NotImplementedError
    def search(self, vector: list[float], k: int = 6, kinds: list[str] | None = None) -> list[Hit]: raise NotImplementedError
    def count(self) -> int: raise NotImplementedError
    def clear(self, kind: str | None = None) -> None: raise NotImplementedError

class PgVectorStore(VectorStore):
    """PostgreSQL + pgvector. Table is created on first use; cosine distance with an HNSW index."""
    name = "pgvector"
    def __init__(self, dsn: str, dim: int, table: str = "printverity_docs"):
        import psycopg
        from pgvector.psycopg import register_vector
        self.dsn, self.dim, self.table = dsn, dim, table
        self.conn = psycopg.connect(dsn, autocommit=True, connect_timeout=3)
        with self.conn.cursor() as cur:
            cur.execute("CREATE EXTENSION IF NOT EXISTS vector")
        register_vector(self.conn)
        with self.conn.cursor() as cur:
            cur.execute(f"""CREATE TABLE IF NOT EXISTS {table} (id text PRIMARY KEY, kind text NOT NULL, title text, content text NOT NULL,
                            metadata jsonb DEFAULT '{{}}'::jsonb, embedding vector({dim}) NOT NULL, updated_at timestamptz DEFAULT now())""")
            cur.execute(f"CREATE INDEX IF NOT EXISTS {table}_kind_idx ON {table}(kind)")
            try: cur.execute(f"CREATE INDEX IF NOT EXISTS {table}_embedding_idx ON {table} USING hnsw (embedding vector_cosine_ops)")
            except Exception as e: log.info("hnsw index not created: %s", str(e)[:80])
    def upsert(self, docs):
        n = 0
        with self.conn.cursor() as cur:
            for d in docs:
                cur.execute(f"""INSERT INTO {self.table} (id, kind, title, content, metadata, embedding) VALUES (%s, %s, %s, %s, %s, %s)
                                ON CONFLICT (id) DO UPDATE SET kind = EXCLUDED.kind, title = EXCLUDED.title, content = EXCLUDED.content, metadata = EXCLUDED.metadata, embedding = EXCLUDED.embedding, updated_at = now()""",
                            (d.id, d.kind, d.title, d.text, json.dumps(d.metadata), d.vector)); n += 1
        return n
    def search(self, vector, k=6, kinds=None):
        with self.conn.cursor() as cur:
            if kinds:
                cur.execute(f"SELECT id, kind, title, content, metadata, 1 - (embedding <=> %s::vector) AS score FROM {self.table} WHERE kind = ANY(%s) ORDER BY embedding <=> %s::vector LIMIT %s", (vector, kinds, vector, k))
            else:
                cur.execute(f"SELECT id, kind, title, content, metadata, 1 - (embedding <=> %s::vector) AS score FROM {self.table} ORDER BY embedding <=> %s::vector LIMIT %s", (vector, vector, k))
            return [Hit(r[0], r[1], r[2], r[3], r[4] or {}, float(r[5])) for r in cur.fetchall()]
    def count(self):
        with self.conn.cursor() as cur:
            cur.execute(f"SELECT count(*) FROM {self.table}"); return int(cur.fetchone()[0])
    def clear(self, kind=None):
        with self.conn.cursor() as cur:
            cur.execute(f"DELETE FROM {self.table}" + (" WHERE kind = %s" if kind else ""), (kind,) if kind else None)

class LocalStore(VectorStore):
    """JSON + NumPy on disk. Same semantics as the pgvector store (cosine similarity)."""
    name = "local"
    def __init__(self, path: Path, dim: int):
        import numpy as np
        self.np = np; self.path = Path(path); self.dim = dim
        self.docs: dict[str, Document] = {}
        if self.path.exists():
            try:
                for d in json.loads(self.path.read_text(encoding="utf-8")):
                    if len(d.get("vector") or []) == dim: self.docs[d["id"]] = Document(**d)
            except Exception as e: log.warning("local store unreadable, starting empty: %s", e)
        self._rebuild()
    def _rebuild(self):
        ids = list(self.docs); self.ids = ids
        self.matrix = self.np.array([self.docs[i].vector for i in ids], dtype="float32") if ids else self.np.zeros((0, self.dim), dtype="float32")
        norms = self.np.linalg.norm(self.matrix, axis=1, keepdims=True); norms[norms == 0] = 1.0
        self.matrix = self.matrix / norms
    def _save(self):
        self.path.parent.mkdir(parents=True, exist_ok=True)
        self.path.write_text(json.dumps([asdict(d) for d in self.docs.values()]), encoding="utf-8")
    def upsert(self, docs):
        n = 0
        for d in docs: self.docs[d.id] = d; n += 1
        self._rebuild(); self._save(); return n
    def search(self, vector, k=6, kinds=None):
        if not self.ids: return []
        q = self.np.array(vector, dtype="float32"); q = q / (self.np.linalg.norm(q) or 1.0)
        scores = self.matrix @ q
        order = self.np.argsort(-scores)
        out = []
        for i in order:
            d = self.docs[self.ids[int(i)]]
            if kinds and d.kind not in kinds: continue
            out.append(Hit(d.id, d.kind, d.title, d.text, d.metadata, float(scores[int(i)])))
            if len(out) >= k: break
        return out
    def count(self): return len(self.docs)
    def clear(self, kind=None):
        self.docs = {i: d for i, d in self.docs.items() if kind and d.kind != kind}; self._rebuild(); self._save()

def open_store(dim: int) -> VectorStore:
    pref = config.VECTOR_STORE
    if pref in ("auto", "pgvector"):
        try:
            s = PgVectorStore(config.DATABASE_URL, dim); log.info("vector store: pgvector (%s docs)", s.count()); return s
        except Exception as e:
            if pref == "pgvector": raise
            log.info("pgvector unavailable (%s); using local store", str(e).splitlines()[0][:100])
    return LocalStore(config.INDEX_DIR / f"vectors_{dim}.json", dim)
