# ---- front end build
FROM node:22-slim AS frontend
WORKDIR /fe
COPY frontend/package.json ./
RUN npm install --silent
COPY frontend ./
COPY static/style.css /static/style.css
RUN npm run build

# ---- application
FROM python:3.12-slim
WORKDIR /srv/printverity
RUN apt-get update && apt-get install -y --no-install-recommends fonts-dejavu-core tesseract-ocr libgl1 libglib2.0-0 && rm -rf /var/lib/apt/lists/*
COPY requirements.txt .
RUN pip install --no-cache-dir torch torchvision --index-url https://download.pytorch.org/whl/cpu && pip install --no-cache-dir -r requirements.txt
COPY app app
COPY static static
COPY --from=frontend /static/dist static/dist
COPY data/specs data/specs
COPY data/plm.json data/plm.json
COPY data/profiles data/profiles
COPY data/fonts data/fonts
COPY data/templates data/templates
EXPOSE 8710
ENV PV_DATA_DIR=/srv/printverity/data
CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8710"]
