# Reference package: test guide

The reference package is a drive module from a fictional OEM customer: an assembly, a machined bracket in two revisions, a shaft, a sheet-metal bracket, the PDF plots of three of them, two STEP models, a BOM and a purchase order. Every drawing carries known drafting problems, and every screen of PrintVerity has something to find in it.

PrintVerity has no built-in demo data. You load this package the same way a customer loads their own drawings: through **Queue → Upload drawing package**. It takes about five minutes to upload and 20 minutes to walk through.

App: `http://2.25.222.52:8710` (or `http://127.0.0.1:8710` on the server itself).

## What is in the package

| File | What it is |
|---|---|
| `drawings/4471-020_D.dxf` | Bracket, mounting. Current revision D. Native DXF. |
| `drawings/4471-020_C.dxf` | The same bracket, previous revision C. |
| `drawings/4471-020_D_layout.dxf` | Bracket Rev D drawn the other common way: title block in a paper-space layout, part in model space behind a viewport. |
| `drawings/4471-105_B.dxf` | Shaft, pinion. |
| `drawings/4471-000_B.dxf` | Drive module assembly with parts list and balloons. |
| `drawings/4471-210_A.dxf` | Sheet-metal sensor bracket with formed view, bend table and flat pattern. |
| `drawings/4471-020_D.pdf`, `4471-105_B.pdf`, `4471-000_B.pdf` | Vector PDF plots of the same sheets, as a CAD plot produces them. |
| `documents/4471-020_D.stp` | STEP model of the bracket. One hole in the model is still at the old size. |
| `documents/4471-105_B.stp` | STEP model of the shaft. |
| `documents/BOM_4471-000_rev3.xlsx` | Bill of materials for the assembly. |
| `documents/PO_88213.xlsx` | Purchase order. It was never updated after the Rev D change. |

## Step 1: upload the five jobs

Queue → **Upload drawing package**, once per row. Type the job name and customer exactly as shown so the results match this guide. Leave a field empty where the table says "—".

| Job name | Customer | Drawings | STEP | BOM | PO |
|---|---|---|---|---|---|
| `Job 24-1187 · Drive module (assembly, bracket Rev D, shaft)` | `OEM customer A` | `4471-000_B.dxf`, `4471-020_D.dxf`, `4471-105_B.dxf` | `4471-020_D.stp` | `BOM_4471-000_rev3.xlsx` | `PO_88213.xlsx` |
| `Job 24-1160 · Bracket 4471-020 previous revision (Rev C)` | `OEM customer A` | `4471-020_C.dxf` | — | — | — |
| `Job 24-1203 · PDF plots of the same package` | `OEM customer A` | `4471-020_D.pdf`, `4471-105_B.pdf`, `4471-000_B.pdf` | `4471-105_B.stp` | — | — |
| `Job 24-1211 · Layout-style DXF (title block in paper space)` | `OEM customer B` | `4471-020_D_layout.dxf` | — | — | — |
| `Job 24-1215 · Sheet metal bracket 4471-210 (formed view + flat pattern)` | `OEM customer B` | `4471-210_A.dxf` | — | — | — |

Expected: nine rows in the queue, each with a part number, a revision, a finding count and a check time under a second. No row shows an error.

The same upload from a terminal, for one job:

```bash
cd testdata/reference
curl -F "name=Job 24-1187 · Drive module (assembly, bracket Rev D, shaft)" -F "customer=OEM customer A" \
     -F "drawings=@drawings/4471-000_B.dxf" -F "drawings=@drawings/4471-020_D.dxf" -F "drawings=@drawings/4471-105_B.dxf" \
     -F "step=@documents/4471-020_D.stp" -F "bom=@documents/BOM_4471-000_rev3.xlsx" -F "po=@documents/PO_88213.xlsx" \
     "http://127.0.0.1:8710/api/jobs?wait=1"
```

## Step 2: drawing review

Open each row from the queue. Expected findings, most severe first:

**4471-020 Rev D (DXF), 6 findings**

| Severity | Rule | Finding |
|---|---|---|
| critical | GD-01 | Datum B referenced but not defined on the sheet |
| high | TH-03 | Thread callout M6x1.0 on a Ø6.6 hole, larger than the thread major diameter |
| medium | DM-01 | Duplicated dimension 46 |
| medium | SP-02 | QS-114 Rev B is superseded (current: Rev D) |
| medium | MC-01 | Material differs: note says 'AL 6061-T6 PLATE', title block says 'AL 6061-T651' |
| low | TB-02 | Title block: CHECKED field is blank |

**4471-105 Rev B (DXF), 5 findings:** datum B not defined (critical); dimension text '545 ±0.3' does not match the geometry (540) (high); ECO-2299 on the drawing vs ECO-2304 in PLM (high); 'KEYWAY 8 x 4' has no fit class (high, customer rule); C-code chamfer note C1 (medium, drawing-standard rule).

**4471-000 Rev B (assembly DXF), 4 findings:** balloon 8 has no parts list entry (critical); item 7 CLS-M4-1 is never ballooned (high); a note references ITEM 9, which is not in the parts list (medium); reference to DETAIL B, which does not exist (medium).

**4471-020 Rev C (DXF), 5 findings:** datum B not defined (critical); PLM has Rev D released (high); M6x1.0 on a Ø6.35 hole (high); ASME Y14.5-2009 superseded by 2018 (medium); QS-114 Rev B superseded (medium).

**4471-210 Rev A (sheet metal), 5 findings:** bend radius R1.5 in the formed view vs R2 in the note and bend table (critical); thickness 1.5 in the bend table vs 2 elsewhere (high); a Ø6.5 hole 3.0 from the bend line, minimum 7.0 (high); flat pattern 138.9 does not recompute, 135.4 expected (medium); CHECKED blank (low).

**PDF plots:** 4471-020 D has 5 findings (the DXF list without the duplicated dimension, which needs dimension geometry). 4471-105 B has 4 (without the 545/540 override, same reason). 4471-000 B has the same 4 as the DXF.

**4471-020 Rev D layout-style DXF, 3 findings:** datum B not defined, QS-114 Rev B superseded, CHECKED blank. The title block is read from paper space and the markers land on the sheet through the viewport.

Things to try on the review screen:

- Wheel zoom centres on the cursor; **+**, **−** and **Fit** work; `&zoom=2` on the review URL opens it zoomed.
- **Accept** one finding, **Reject** another with a note: the rejected marker disappears from the sheet. **Re-check** keeps both decisions.
- **Callout** opens the work-instruction image for a finding. **Voice** attaches an audio note, transcribed when the AssemblyAI key is set.
- **Findings CSV** downloads the list. **Markup PDF** opens the marked sheet plus a findings page.
- **Extracted data** shows the title block with confidence and source, notes, dimensions, GD&T, datums, threads and specs. **Pipeline** shows the review stages and their times.

## Step 3: revision comparison

Compare preselects the most recently uploaded part that exists in two revisions, using the native DXF of each. With this package that is From `4471-020 Rev C` (Job 24-1160) and To `4471-020 Rev D` (Job 24-1187, `4471-020_D.dxf`), and the comparison runs straight away.

Expected: 14 changes, ECO-2291 matches PLM.

| Impact | Changes |
|---|---|
| Fit (4) | hole callout 4X Ø6.35 → Ø6.60; slot 22.0 → 24.0 (callout and dimension); dimension 46 added |
| Process (2) | TAP 4X M6x1.0-6H note removed; material note added |
| Inspection (1) | overall 120 ±0.2 → ±0.1 |
| Purchasing (1) | material AL 6061-T6 → AL 6061-T651 |
| Cosmetic (6) | Y14.5-2009 → 2018 in note 1; REV, ECO, DRAWN, CHECKED, APPROVED |

Try **Export change report (xlsx)**, **Open side-by-side PDF** and **Send to quality inbox** (a dated drop folder when no mail server is configured).

## Step 4: consistency

Consistency on Job 24-1187. Expected: 4 conflicts.

| Severity | Field | Drawing | BOM | PO |
|---|---|---|---|---|
| critical | Rev, 4471-020 | D | D | C |
| critical | Qty, NAS1149F0632P washer | 4X (item 6) | 8 | 400 |
| high | Finish, 4471-020 | ANODIZE TYPE II CLR | ANODIZE TYPE II CLR | CHEM FILM |
| medium | Material, 4471-020 | AL 6061-T651 | AL 6061-T651 | AL 6061-T6 |

The other rows show as matches. Job 24-1160 has no BOM or PO, so the screen explains what to attach.

## Step 5: model check

Model on Job 24-1187. Expected: the bracket body in 3D. The Ø6.35 hole is red because the model still has the Rev C size, the three Ø6.6 holes are gray-blue because they match the drawing, and the slot ends are amber because they are not called out. The assembly and the shaft are listed as not checked: the model belongs to a different part. Drag to orbit, wheel to zoom. A browser without WebGL shows the server-rendered preview with view buttons.

## Step 6: documents and templates

- Docs → pick `4471-020 Rev D`. **Inspection plan (xlsx)** lists every dimension, callout and GD&T frame with method and frequency. **CoC (docx)** fills part, revision, material, finish and specs; type a quantity and PO number first, or leave them blank for a write-in line. **Work instruction (docx)** has one section per open finding with its callout image. **Approve and release** copies the file to the release store.
- Bulk template edit: Find `QS-114 Rev B`, Replace `QS-114 Rev D`, **Preview**: 5 occurrences in 5 templates, nothing written. **Apply with tracked changes**: Word templates get tracked changes, Excel templates a change-log sheet.

## Step 7: Ask and Audit

Ask on Job 24-1187:

- "What is the finish on the bracket?" → anodize Type II clear, with the source sheet cited.
- "Which datums are defined and which are referenced?" → A defined, B referenced but missing.
- "Is the PO at the right revision?" → no, PO 88213 is at Rev C while the drawing and BOM are at Rev D.
- "What does Y14.5 say about datum references?" → answered from the standard excerpts, not from the drawing.

Audit lists every upload, check, decision, export and document.

## Step 8: settings

Click **Settings** at the bottom of the left rail. Choose **Dark**: the whole interface switches, the drawing sheet stays white. Reload the page: the choice is kept. **System** follows the operating system setting. Choose **Light** to return.

## Checklist

| Step | Pass when |
|---|---|
| 1 Upload | 9 rows, no errors, part numbers and revisions read |
| 2 Review | The counts and findings above; accept, reject, note, callout, CSV and markup work; zoom is centred |
| 3 Compare | 14 changes, ECO match, three exports work |
| 4 Consistency | 4 conflicts on Job 24-1187 |
| 5 Model | red Ø6.35 hole, gray-blue Ø6.6 holes, two drawings not checked |
| 6 Docs | inspection plan, CoC and work instruction generate; bulk edit 5 in 5 |
| 7 Ask, Audit | answers with citations; audit entries |
| 8 Settings | Dark, System and Light apply and persist |

To remove the package, delete the jobs from the queue.
