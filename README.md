# PrintVerity

Drawing review and technical documentation agent for a machine shop. Runs locally.

What it does on a drawing package:

- **Drawing review**: reads DXF (native entities via ezdxf, paper-space layouts included), vector PDF (PyMuPDF) or scanned sheets (Tesseract / PaddleOCR with a YOLOv8 layout model), extracts title block, notes, dimensions, GD&T frames, datums, callouts, threads and spec references, then runs deterministic rule checks. Findings carry a severity, a confidence score and a location; they are drawn as numbered markers on the sheet and can be accepted or rejected. Markup PDF export.
- **Revision comparison**: pairs dimensions by feature points and notes by number/text between two revisions, classifies each change (Fit / Process / Inspection / Purchasing / Cosmetic) and cross-checks the ECO against the PLM record. Exports an xlsx change report and a side-by-side PDF, and hands the package to the quality inbox (SMTP or drop folder).
- **Cross-document consistency**: drawing set vs BOM vs purchase order (rev, material, finish, quantities, parts list, hardware).
- **Drawing vs STEP model**: cylindrical features in the model vs hole callouts and diameter dimensions on the drawing, with a 3D view of the body coloured by status.
- **Sheet metal**: bend radius, thickness, hole-to-bend distance and flat-pattern recompute checks from the bend table, notes and the formed view.
- **Documentation**: fills the inspection plan (xlsx) and certificate of conformance (docx) from drawing data; bulk find/replace across all templates with Word tracked changes.
- **Q&A**: a LangGraph agent over Claude tool calls (package search, knowledge retrieval, findings, title blocks, reports), cited to the sheet; a local planner answers without credentials. Also reachable through an Amazon Lex channel and an Amazon Bedrock AgentCore entry point.
- **Retrieval (RAG)**: spec library, customer rules, ASME Y14.5 excerpts, templates and past decisions embedded (sentence-transformers or Voyage AI) into pgvector on PostgreSQL, local store fallback. Findings are enriched with the clauses they rest on.
- **Pipeline**: every review runs as a LangGraph graph (ingest → extract → rule check → enrich → finalize) on Celery workers over Redis when present, inline otherwise; the trace is shown per drawing.
- **Integrations**: Epicor REST for part revisions and POs (local PLM file offline), S3 release of approved documents, AssemblyAI voice notes on findings, work-instruction callout images (optional image API).
- **Customer setup** (Setup screen, in the browser): each customer's title-block wording, with suggestions read from the customer's own uploaded title blocks; spec register and released-revision imports (CSV or Excel); one-click re-check of the customer's drawings that keeps engineers' decisions. Specs in the library are recognised on drawings by their exact reference, whatever the numbering scheme.
- **Audit log** of every check, decision, setup change and generated document.
- **Interface**: React review screens with light and dark themes (Settings at the bottom of the left rail; drawing sheets stay white in both).

## Run

```bash
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
./run.sh            # http://127.0.0.1:8710
```

The app starts empty, like a fresh customer install. Upload drawings from **Queue → Upload drawing package**. Two test packages with step-by-step guides and expected results are in `testdata/`: the reference package (`testdata/reference/GUIDE.md`) and the NorthBay client kit (`testdata/northbay/GUIDE.md`).

Optional keys (all in `.env` or the environment): `ANTHROPIC_API_KEY` (agent Q&A), `VOYAGE_API_KEY` (hosted embeddings), `ASSEMBLYAI_API_KEY` (voice notes), `OPENAI_API_KEY` (AI illustrations), `EPICOR_BASE_URL`/`EPICOR_API_KEY` (live PLM), `PV_S3_BUCKET` (release to S3). `DATABASE_URL` and `REDIS_URL` select pgvector and Celery; both fall back to local equivalents.

Services on this machine: PostgreSQL with pgvector, Redis, Tesseract. `run.sh` starts a Celery worker when Redis answers.

```bash
make test      # unit tests
make check     # full-system check: uploads both test packages, exercises every endpoint and view (headless Chrome)
make frontend  # rebuild the React/TypeScript UI into static/dist
make train-layout  # synthesize the layout dataset from the reference DXFs and train the YOLOv8 layout model
make docker    # container image (multi-stage: node build + python runtime)
```

## Access from other machines

By default the server listens on 127.0.0.1 only. To share it:

1. Set `PV_HOST=0.0.0.0` in `.env` and open port 8710 in the firewall (`sudo ufw allow 8710/tcp`).
2. `./run.sh` and open `http://<this-machine-ip>:8710` from the other machine.
   Optional: set `PV_ACCESS_TOKEN=...` in `.env` to require a token (login page; `?token=` becomes a cookie; API clients send `X-Access-Token`).
3. Optional, to keep it running across logout and reboot: `sudo cp infra/printverity.service /etc/systemd/system/ && sudo systemctl enable --now printverity`.

Interactive API docs: http://127.0.0.1:8710/docs. Rule catalogue: `GET /api/rules`. Findings export: `GET /api/jobs/{job}/drawings/{drawing}/findings.csv` (or `.json`).

Customer setup is done in the app (**Setup**): title-block wording per customer, the spec library and the released-revision register. Nothing is configured on the server per customer. See ARCHITECTURE.md for where the setup is stored.

## Layout

```
app/
  main.py            FastAPI routes (thin: validation, storage, routing)
  config.py          settings from environment / .env
  orchestration/     LangGraph review graph (graph.py) and the Q&A agent (agent.py)
  dxf_extract.py     native DXF extraction (ezdxf), shared interpretation logic
  pdf_extract.py     vector PDF extraction (PyMuPDF), same interpretation
  vision/            scanned sheets: OCR engines, YOLOv8 layout model, raster extractor, training scripts
  rules.py           deterministic checks (42 rules, catalogue in RULES); sheetmetal.py for bend-related checks
  exports.py         change-report xlsx, side-by-side PDF, quality-inbox hand-off
  customers.py       customer setup: title-block wording, suggestions from the customer's title blocks, spec and revision registers
  retrieval/         embeddings, pgvector / local vector store, knowledge indexer, retriever
  geometry/          STEP: OpenCascade engine, text-parser fallback, cross-check, tessellation for the 3D view
  compare.py         revision comparison and impact classification
  consistency.py     drawing set vs BOM vs PO (tables.py reads xlsx / csv)
  docs.py            template filling, work instructions, bulk edit with tracked changes
  render.py          SVG / PNG rendering with markers, markup PDF
  tasks/             Celery application and job runner (inline fallback)
  integrations/      Epicor, S3 storage, AssemblyAI voice notes, illustrations, Amazon Lex
  agentcore_app.py   Bedrock AgentCore entry point
  reports.py, store.py, patterns.py, tables.py, qa.py, util.py
frontend/            React + TypeScript (Vite) source; built into static/dist
static/              style.css and the built front end (dist/)
data/                specs, profiles, plm.json, templates, fonts, models/layout.pt; jobs and out are runtime folders
testdata/            test packages with guides: reference/ (drive module) and northbay/ (new-customer kit)
tests/               unit tests, the full-system check, edge-case DXF fixtures
infra/               docker-compose, Terraform (ECS, RDS, ElastiCache, S3, ALB), Lex bot definition
```

## Input formats

DXF (any version, R2013+ preferred), vector PDF, scanned sheets (PNG, JPG, TIFF or image-only PDF, read with OCR and the layout model), STEP AP203/AP214, BOM and PO as xlsx or csv. DWG must be exported to DXF first. Upload limit 60 MB per file.
