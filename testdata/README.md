# Test data

PrintVerity ships without demo content. These two packages are ordinary input files, loaded through the same upload screen a customer uses. Each folder has a `GUIDE.md` with the upload steps and the expected result of every check.

| Folder | What it is | Use it to |
|---|---|---|
| `reference/` | Drive module from a fictional OEM customer: assembly, bracket in two revisions, shaft, sheet-metal bracket, PDF plots, two STEP models, BOM and PO. | Walk through every screen with known results. This is the package behind the product screenshots. |
| `northbay/` | Drawings from a second fictional company, NorthBay Engineering, with its own title-block wording, part numbers and specs, plus a scan, an inch drawing, a DWG and a customer onboarding step. | Test the product the way a new customer would, including onboarding a customer profile. |

Both packages are read by the automated tests as well (`make test`, `make check`), so the results in the guides are verified on every run.

The drawings are fictional and contain deliberate drafting errors. Do not use them as a drafting reference.
