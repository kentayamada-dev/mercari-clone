.PHONY: dev
dev:
	python3 dev_server.py

.PHONY: prod
prod:
	gunicorn --worker-class uvicorn.workers.UvicornWorker app.main:app

.PHONY: test
test:
	pytest -x -vv --cov-config=.coveragerc --cov-report=term --cov=app app/test/ --cov-report xml

.PHONY: seed
seed:
	python3 seed.py
