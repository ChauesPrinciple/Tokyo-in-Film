---
name: update-css-version
description: Update CSS version number across all HTML files when styles are modified
---

# Update CSS Version Skill

## Purpose
Make browsers pick up changes to `style.css` (and `js/*.js`) on the live site.

## How it works now
Manual `style.css?v=NN` bumps are **obsolete**. `tools/build.py` rewrites every
`style.css?v=...` and `js/<file>.js?v=...` reference to an 8-character content hash,
so the version changes automatically whenever the file changes.

## Process

```powershell
python tools/build.py     # rewrites hashes + regenerates nav/footer/head regions
python tools/check.py     # confirms every page is fresh and links resolve
```

Then commit and deploy (see `deploy-site`).

## Verification
- `python tools/build.py --check` prints `All pages up to date.`
- `grep -n "style.css?v=" index.html pre-production/guide.html` shows the same hash on both.

## Notes
- The build reads/writes UTF-8 without BOM and preserves CRLF, so Japanese characters are safe.
- Pages in `STANDALONE` (`tools/sitelib.py`) that do not load `style.css` are untouched.
- Details of the region/partial system: `AGENTS.md` (repo root).
