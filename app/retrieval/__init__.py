"""Retrieval layer (RAG): embeddings, vector store and the indexed knowledge (spec library, customer rules, standard excerpts, past findings)."""
from .service import Retriever, get_retriever, WARMED
__all__ = ["Retriever", "get_retriever", "WARMED"]
