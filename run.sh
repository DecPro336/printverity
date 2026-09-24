#!/usr/bin/env bash
# Start PrintVerity locally: API + front end on the given port, plus a Celery worker when Redis answers.
# Usage: ./run.sh [port]      Stop: ./run.sh stop
cd "$(dirname "$0")"
PORT="${1:-8710}"
if [ "$1" = "stop" ]; then
  [ -f .run/worker.pid ] && kill "$(cat .run/worker.pid)" 2>/dev/null; rm -f .run/worker.pid
  fuser -k "${2:-8710}/tcp" >/dev/null 2>&1; echo "stopped"; exit 0
fi
if [ ! -x .venv/bin/python ]; then
  echo "Virtualenv missing. Run: python3 -m venv .venv && .venv/bin/pip install -r requirements.txt"; exit 1
fi
if [ -f .env ]; then while IFS='=' read -r k v; do case "$k" in ''|\#*) continue;; esac; [ -z "${!k+x}" ] && export "$k=$v"; done < .env; fi
if [ ! -f static/dist/index.html ] && command -v npm >/dev/null; then (cd frontend && npm install --silent && npm run build --silent); fi
mkdir -p .run
if [ "${PV_CELERY:-auto}" != "off" ] && .venv/bin/python - <<'PY' 2>/dev/null
import os, redis, sys
sys.exit(0 if redis.Redis.from_url(os.environ.get("REDIS_URL", "redis://127.0.0.1:6379/0"), socket_connect_timeout=0.5).ping() else 1)
PY
then
  if ! [ -f .run/worker.pid ] || ! kill -0 "$(cat .run/worker.pid)" 2>/dev/null; then
    nohup .venv/bin/celery -A app.tasks.celery_app worker -l warning --concurrency=2 -Q celery > .run/worker.log 2>&1 &
    echo $! > .run/worker.pid; echo "Celery worker started (Redis broker)"
  fi
else
  echo "Redis not reachable: reviews run inline"
fi
HOST="${PV_HOST:-127.0.0.1}"
echo "PrintVerity  ->  http://${HOST}:${PORT}$( [ -n "${PV_ACCESS_TOKEN:-}" ] && echo '   (access token required)' || echo '   (open access)')"
exec .venv/bin/python -m uvicorn app.main:app --host "${HOST}" --port "${PORT}" --log-level warning --proxy-headers --forwarded-allow-ips='*'
