# PrintVerity architecture

```
 upload (DXF / PDF / scan / STEP / BOM / PO)          Amazon Lex channel        AgentCore runtime
   │                                                     │                         │
   ▼                                                     ▼                         ▼
 app/main.py (FastAPI) ──► app/tasks (Celery on Redis, inline fallback) ──► app/orchestration/graph.py  (LangGraph)
                                                                             ingest → extract → rule_check → enrich → finalize
                                   ┌──────────────────────────────────────────────┴─────────────────────────────┐
                                   │ extract: dxf_extract (ezdxf, layouts + viewports) · pdf_extract (PyMuPDF) │
                                   │          vision/raster (Tesseract or PaddleOCR + YOLOv8 layout model)      │
                                   │ rule_check: rules.py + sheetmetal.py (42 checks, PLM via integrations/epicor)│
                                   │ enrich: retrieval (sentence-transformers or Voyage embeddings → pgvector)  │
                                   └────────────────────────────────────────────────────────────────────────────┘
 app/orchestration/agent.py   Q&A agent: LangGraph loop over Claude tool calls (search_package, search_knowledge, get_findings, get_title_block, get_reports); local planner without credentials
 app/geometry                 STEP: OpenCascade (OCP) B-rep face walk, text-parser fallback; cross-check vs callouts and Ø dimensions; tessellation (mesh.py) for the three.js view
 app/exports.py               revision change report (xlsx), side-by-side PDF, quality-inbox hand-off (SMTP or drop folder)
 app/compare.py               revision diff with impact classes and ECO vs PLM
 app/consistency.py           drawing set vs BOM vs PO (tables.py reads xlsx / csv)
 app/customers.py             customer setup: title-block wording with suggestions from the customer's own title blocks, spec and revision registers
 app/docs.py                  inspection plan, CoC, work instruction (with callout images), bulk edit with Word tracked changes
 app/render.py                DXF → SVG / PDF → PNG with markers, markup PDF
 app/integrations             epicor (ERP/PLM REST), storage (S3 / local), voice_notes (AssemblyAI), illustrations (crop + optional image API), lex (channel)
 app/store.py                 job persistence (JSON), audit log
 frontend/                    React + TypeScript (Vite) → static/dist; three.js model viewer; layout/OCR overlay on scanned sheets; light/dark theme (theme.ts, Settings)
 infra/                       docker-compose (app, worker, pgvector, redis), Terraform (ECS Fargate, RDS, ElastiCache, S3, ALB), Lex bot definition
```

## Design rules

- **Deterministic first.** Every check that can be computed is computed in `rules.py`; the language model handles interpretation and wording only. Findings carry a rule id, severity, confidence, location and retrieved references.
- **Every stage degrades, never disappears.** No Anthropic key → local planner. No Postgres → local vector store. No Redis/worker → inline processing. No YOLO weights → heuristic layout. No OCP → text STEP parser. No AssemblyAI key → audio kept, transcript pending. No S3 → local release folder.
- **Same interpretation for every input.** DXF, vector PDF and scans all end in the same title-block, note, callout, thread and parts-list logic.
- **Customers are set up in the product, not on the server.** Title-block wording, the spec library and released revisions are edited in Setup; a re-check applies them to drawings already uploaded and keeps engineers' decisions.
- **Nothing leaves without a click.** Generated documents stay in `data/out` until released; template edits are tracked changes; every decision is audited and becomes retrievable precedent.

## Configuration

| Item | Where |
|---|---|
| Model, embeddings, vector store, queue, OCR, layout weights | environment / `.env` (see `app/config.py`) |
| Title-block wording per customer | edited in **Setup → Customers**; stored in `data/profiles/<customer-slug>.json` (`PV_PROFILES_DIR`) |
| Spec library | imported in **Setup → Spec library**; stored in `data/specs/library.json` (`PV_SPEC_LIBRARY`); every spec listed is recognised on drawings by its exact reference |
| Customer rules, standard excerpts | `data/specs/` |
| Released revisions / ECOs (offline PLM) | imported in **Setup → Released revisions**; stored in `data/plm.json` (`PV_PLM_FILE`); live: `EPICOR_BASE_URL` + key |
| Templates | `data/templates/` |

## Tests

- `make test` — unit tests: extraction, rules, compare, consistency, STEP, docs, graph, agent, retrieval, vision, queue, integrations.
- `make check` — full-system check: starts the server through `run.sh` with a scratch job store, uploads the reference package and the NorthBay kit through the upload API and checks the results their guides promise, exercises every endpoint (documents, channels, exports), renders every React view in headless Chrome (including the theme switch) and scans for JavaScript errors.
- Test data: `testdata/` holds the two packages (see `testdata/README.md`); `tests/fixtures/` holds third-party edge-case DXFs from the ezdxf examples. The product itself ships no demo content.
