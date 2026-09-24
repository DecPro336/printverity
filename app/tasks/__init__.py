"""Background processing: Celery workers on Redis when available, inline execution otherwise."""
from .runner import submit_review, worker_status
__all__ = ["submit_review", "worker_status"]
