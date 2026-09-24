# NorthBay client kit: test guide

This folder lets you test PrintVerity the way a new customer would: with drawings the system has never seen, from a fictional
company (NorthBay Engineering) whose title block uses its own wording, its own part numbers and its own specification references.

Open the app at **http://2.25.222.52:8710** (no login). Everything below takes about 20 minutes and runs in the browser, including setting up the new customer (Test 9).

To hand this kit to someone, zip this `northbay` folder.

## What is in the kit

| File | What it is | Why it is here |
|---|---|---|
| `drawings/NB-3120-001_rev2.dxf` | Housing plate, current revision, native DXF | The main review test. Seeded with six drafting problems (list below). |
| `drawings/NB-3120-001_rev1.dxf` | The previous revision of the same plate | For the revision comparison. |
| `drawings/NB-3120-001_rev2.pdf` | The Rev 2 sheet plotted to vector PDF | Same drawing through the PDF path. |
| `drawings/NB-3120-001_rev2_SCAN.png` | A 300 dpi scan of Rev 2 (slightly rotated, noisy) | The scanned-sheet path: OCR plus the layout model. |
| `drawings/NB-3120-003_revA.dxf` | Spacer, a clean drawing | Shows that a correct drawing gets no findings. |
| `drawings/NB-3120-005_revB_inch.dxf` | Bushing dimensioned in inches with UNC threads | Units handling and unified thread checks. |
| `drawings/NB-3120-007_revA_sheetmetal.dxf` | Sheet-metal cover with bend table and flat pattern | Sheet-metal rules. |
| `drawings/NB-3120-000_revB_assembly.dxf` | Assembly with parts list and balloons | Parts-list checks and the cross-document check. |
| `drawings/NB-3120-002_revA.dwg` | A DWG file | Shows the polite refusal; DWG must be exported to DXF. |
| `documents/NB-3120-001_rev2.stp` | STEP model of the housing plate | Drawing vs model check and the 3D view. One hole is the wrong size in the model. |
| `documents/BOM_NB-3120-000_revB.csv` | Bill of materials for the assembly (csv) | Cross-document check. |
| `documents/PO_NB-70211.xlsx` | Purchase order (xlsx) | Cross-document check; the PO is at an old revision. |
| `customer_setup/spec_register.csv` | NorthBay's spec register (NB-QS-27, Rev A superseded by Rev B) | Imported in Setup during Test 9. |
| `customer_setup/released_revisions.csv` | NorthBay's released revisions with change orders | Imported in Setup during Test 9. |

## Test 1: upload the package (Queue)

1. Queue → **Upload drawing package**.
2. Job name: `NB job 26-0412`. Customer: `NorthBay Engineering` (the setup in Test 9 is attached to this name).
3. Drawings: select all files in `drawings/` at once (including the .dwg). STEP: `documents/NB-3120-001_rev2.stp`. BOM: the csv. PO: the xlsx.
4. **Check package**. The queue shows the drawings as "processing", then fills in part numbers, revisions and finding counts within a few seconds.

Expected: nine rows. `NB-3120-002_revA.dwg` shows an error row with the message "DWG is a closed binary format. Export the drawing as DXF". Every other row has a part number and revision read from the title block.

## Test 2: drawing review (NB-3120-001 Rev 2, DXF)

Click the `NB-3120-001 2` DXF row. Expected findings, top to bottom:

| # | Finding | Why it is right |
|---|---|---|
| 1 | Datum C referenced but not defined on the sheet (critical) | The perpendicularity frame on the bore calls datum C; only A and B are drawn. |
| 2 | Dimension text `161 ±0.1` does not match the geometry (160) (high) | The overall dimension was overridden by hand. |
| 3 | Thread callout M8x1.25 on a Ø8 hole, major diameter, will not tap (high) | Rev 2 opened the holes to 8.0; the tap drill for M8 is 6.8. |
| 4 | Duplicated dimension 60 (medium) | The vertical hole spacing is dimensioned twice. |
| 5 | Material differs: note says AL 5083-H111, title block says AL 5083-H321 (medium) | Temper mismatch. |
| 6 | Title block field missing: FINISH (medium) | NorthBay calls it "SURFACE TREATMENT"; the default vocabulary does not know that word. Resolved by Test 9. |
| 7 | Title block: CHECKED field is blank (low) | The checker never signed. |
| 8 | Part NB-3120-001 not found in PLM (low) | The demo PLM does not know NorthBay parts yet. Resolved by Test 9. |

Try: zoom with the wheel around a marker, **Fit** to reset. Accept finding 1 and reject finding 4: the rejected marker disappears from the sheet. **Note** on any finding. **Callout** opens the work-instruction image for it. **Findings CSV** downloads the list. **Markup PDF** opens the sheet with markers plus a findings page. The **Extracted data** tab shows everything read from the sheet; the **Pipeline** tab shows the stages and their timing.

## Test 3: the same drawing as PDF and as a scan

- `NB-3120-001 2` PDF row: the same datum, thread, material and title-block findings, read from the PDF text layer and vector geometry. Findings that need dimension geometry (the override and the duplicate) are not available from a plot.
- `NB-3120-001_rev2_SCAN.png` row: the footer says the sheet was read with Tesseract OCR and the YOLOv8 layout model. The title block, notes and material mismatch are read from pixels. Geometric checks are off on scans. Use the **Overlay** buttons to see the detected regions with confidence and the OCR lines.

## Test 4: a clean drawing

`NB-3120-003 A` (spacer): two low-level findings only, both about the customer not being set up yet (the finish wording, the part not in the revision register). After Test 9 it shows no findings at all. The system does not invent problems on a correct sheet.

## Test 5: inches and unified threads

`NB-3120-005 B` (bushing): one real finding, "Thread callout 5/16-18 UNC on a Ø0.312 hole, major diameter, will not tap". The 1/4-20 hole at Ø0.201 is correct and produces nothing. Units are read from the file and the note.

## Test 6: sheet metal

`NB-3120-007 A` (cover): "Hole Ø5.5 sits 2.2 from the bend line (minimum 5.2)" and "Flat pattern 137.1 does not recompute (134.4 expected)". Bend radius and thickness are consistent on this sheet, so those checks stay quiet.

## Test 7: assembly and parts list

`NB-3120-000 B`: "Balloon 7 has no parts list entry" (critical), "Item 5 (DIN912-M8X20) is in the parts list but not ballooned" (high), "Reference to DETAIL C but no DETAIL C exists on the sheet" (medium).

## Test 8: reports

- **Compare**: pick `NB-3120-001 Rev 1` as From and `NB-3120-001 Rev 2` as To. Expected: 10 changes. Fit: hole callout Ø6.8 → Ø8.0, overall 160 ±0.2 → 161 ±0.1, added dimension. Process: the TAP note was removed. Inspection: a GD&T frame was added. Purchasing: material H111 → H321. The ECO box says the part is not in PLM until Test 9. Try **Export change report (xlsx)**, **Open side-by-side PDF** and **Send to quality inbox**.
- **Consistency** on the NB job: 5 conflicts. PO at Rev 1 while drawing and BOM are Rev 2 (critical); spacer qty 2 on the parts list vs 3 in the BOM (critical); washers DIN125-M8 in the BOM but not on the print (high); PO material H111 vs H321 (medium); the cover NB-3120-007 is on no BOM or PO line (medium, correct: it is not part of this assembly). The Sources list shows that the Rev 1, PDF and scan copies of NB-3120-001 were skipped: the documents are checked against one copy per part, the latest revision, native DXF first, so the same conflict is never repeated per copy.
- **Model**: the 3D view of the housing plate with three Ø8 holes in gray-blue and one Ø8.5 hole in red; the table says "Drawing calls 4 holes at Ø8; the model has 3. Nearby sizes: Ø8.5". The Ø40 bore is amber: it is dimensioned on the drawing as Ø40.00 H7 but only holes with an "nX Ø" callout are counted, so it is listed as not called out.
- **Docs**: generate the inspection plan, the CoC and the work instruction for NB-3120-001 Rev 2. The inspection plan lists the plate's dimensions with methods and frequencies. Bulk edit: find `NB-QS-27 REV A`, replace with `NB-QS-27 REV B`, Preview: no template references it (the templates belong to the sample customer), which is the correct answer.
- **Ask**: "What is the surface treatment on the housing plate?", "Which datums are referenced but not defined?", "Is the purchase order at the right revision?". Answers cite the sheet, note or report.

## Test 9: setting up the new customer (about two minutes, in the browser)

A new customer is set up once, from the **Setup** screen. Nothing is installed on the server and nothing is repeated per upload: later packages from the same customer use the setup automatically.

1. **Setup** (left rail) → **Spec library** → **Import a spec register**: choose `customer_setup/spec_register.csv`, **Import**. NB-QS-27 appears with Rev B current and Rev A superseded on 2026-05-01.
2. **Setup → Released revisions → Import released revisions**: choose `customer_setup/released_revisions.csv`, **Import**. Six NB parts appear; NB-3120-001 shows Rev 2 current and Rev 1 as an earlier revision.
3. **Setup → Customers → NorthBay Engineering** (the **Set up wording** button on the "Title block field missing: FINISH" finding opens the same page). The page says the finish could not be found on 8 drawings.
4. The card **Found in this customer's title blocks, not recognised yet** lists what PrintVerity read in NorthBay's title blocks: the label `SURFACE TREATMENT` and the block attribute `TREATMENT`, both with the example value `HARD ANODIZE` and the field **Finish** suggested, plus `DWG SIZE` (Sheet size) and `CHANGE ORDER` (Change order) on the sheets where those were not read. Click **Add all with a field**. The entries move into the wording table below.
5. Click **Save and re-check 9 drawings**. When it finishes, the customer shows "set up" and the page says every required field is now read.

Expected after the setup:

| Drawing | Findings | What changed |
|---|---|---|
| NB-3120-001 Rev 2 (DXF) | 7 | The finish is read (HARD ANODIZE) and the PLM finding is gone. A new, correct finding appears: note 3 calls out **NB-QS-27 Rev A, which NorthBay's own register says was superseded on 2026-05-01**. The six drafting problems remain. |
| NB-3120-001 Rev 2 (PDF) | 5 | Same finish, spec and title-block results from the plot |
| NB-3120-001 Rev 2 (scan) | 3 | Finish read from pixels; superseded spec, material mismatch, CHECKED blank |
| NB-3120-001 Rev 1 | 2 | "Drawing is Rev 1 but PLM has Rev 2 released" and the superseded spec |
| NB-3120-003 A (spacer) | 0 | Clean |
| NB-3120-005 B (bushing) | 1 | The 5/16-18 thread only |
| NB-3120-007 A (cover) | 2 | Hole-to-bend and flat pattern only |
| NB-3120-000 B (assembly) | 3 | Balloon 7, item 5, DETAIL C |

Compare Rev 1 → Rev 2 now shows "ECO matches PLM" (CO-4478). Accept / reject decisions and notes made before the re-check are kept.

The wording table can also be edited by hand: type a label or attribute tag next to a field and press Enter. **Remove setup** returns the customer to the standard wording. Registers can be re-imported at any time; existing entries are updated.

## Test 10: your own files

Upload your own DXF, PDF plots, scans, STEP, BOM or PO the same way. Things to know:

- DXF gives the most complete review (geometry checks). PDF plots give title block, notes, GD&T and callouts. Scans give title block, notes and callouts.
- A title block with wording the standard vocabulary does not know shows "field missing" findings. Set up the wording in **Setup → Customers**, as in Test 9.
- Specs and part numbers unknown to this instance appear as low-level "not in the spec library" and "not found in PLM" findings. Import your spec register and released revisions in Setup to turn those checks on for your parts. In a connected installation the revisions come from the ERP.
- Uploads stay on the server under the job until you delete the job from the queue.

## Checklist

| Test | Pass when |
|---|---|
| 1 Upload | 9 rows, DWG refused with the DXF message, part numbers read on the rest |
| 2 Review DXF | The 8 findings above; accept/reject/note/callout/CSV/markup work; zoom is centered |
| 3 PDF and scan | Datum, thread, material findings on the PDF; title block read from the scan; overlays visible |
| 4 Clean drawing | Only the two customer-onboarding findings, none after Test 9 |
| 5 Inches | 5/16-18 flagged, 1/4-20 not |
| 6 Sheet metal | Hole-to-bend and flat-pattern findings only |
| 7 Assembly | Balloon 7, item 5, DETAIL C |
| 8 Reports | 10 changes; 5 conflicts; 3D view with the red hole; documents generate; Ask answers with citations |
| 9 Setup | Suggestions found and added; registers imported; after re-check the finish is read everywhere, the spacer is clean and Rev 2 shows the superseded NB-QS-27 Rev A |
