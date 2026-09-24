"""Celery application. Start a worker with:  .venv/bin/celery -A app.tasks.celery_app worker -l info"""
from __future__ import annotations
from celery import Celery
from .. import config

celery = Celery("printverity", broker=config.REDIS_URL, backend=config.REDIS_URL)
celery.conf.update(task_serializer="json", result_serializer="json", accept_content=["json"], task_track_started=True, worker_prefetch_multiplier=1, task_acks_late=True, result_expires=3600)

@celery.task(name="printverity.review_job", bind=True)
def review_job(self, job_id: str, recheck: bool = False) -> dict:
    from .runner import process_job
    return process_job(job_id, recheck)
