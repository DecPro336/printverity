PY=.venv/bin/python
.PHONY: run stop test check docker frontend worker train-layout
run:            ## start the app (+ Celery worker when Redis is up) on :8710
	./run.sh
stop:           ## stop the app and the worker
	./run.sh stop
worker:         ## start a Celery worker in the foreground
	.venv/bin/celery -A app.tasks.celery_app worker -l info
test:           ## unit tests
	$(PY) -m pytest -q tests
check:          ## full-system check (starts its own server on :8711)
	$(PY) tests/check_all.py
frontend:       ## build the React/TypeScript front end into static/dist
	cd frontend && npm install --silent && npm run build
train-layout:   ## synthesize the layout dataset from testdata/reference and train the YOLOv8 layout model
	$(PY) -m app.vision.training.make_dataset && $(PY) -m app.vision.training.train
docker:         ## build the container image
	docker build -t printverity .
