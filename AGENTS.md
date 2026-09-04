# Tokyo in Film — Site Tooling

Static HTML site deployed to GitHub Pages (no Node). Python 3.12 is the only tooling requirement.

## Shared regions (nav / footer / head)

Every non-standalone page contains three marker regions that are **regenerated** by the build:

```html
<!-- build:head --> ... <!-- /build:head -->      fonts + preconnect + style.css link
<!-- build:nav --> ... <!-- /build:nav -->        site navigation
<!-- build:footer --> ... <!-- /build:footer -->  copyright / CC attribution
```

- Edit `tools/partials/{head,nav,footer}.html`, **not** the copies inside pages — they are overwritten.
- Placeholders: `{{root}}` (relative path prefix, e.g. `../`), `{{active:key}}` (adds `class="active"` on the
  current section), `{{hash:style.css}}` (content hash for cache busting).
- Standalone pages without the shared chrome are listed in `STANDALONE` in `tools/sitelib.py`.

## Commands

```powershell
python tools/build.py          # regenerate regions + rewrite ?v= hashes on style.css / js/*.js
python tools/build.py --check  # exit 1 if any page is stale
python tools/check.py          # build freshness, missing regions, broken local links, mojibake, UTF-8
python -m http.server 8080     # local preview
```

Run `build.py` after editing `style.css`, any `js/*.js`, or a partial. Run `check.py` before every deploy.
The old manual `style.css?v=NN` bump is obsolete — hashes are derived from file content.

## CSS conventions

- Shared components live in `style.css` under "Shared guide / worksheet components" (`.guide-header`,
  `.download-section`, `.example-box`, `.principle-box`, `.step-*`, `.booklet-nav*`, `.assign-*`, etc.).
  Prefer adding a rule there over a per-page `<style>` block if 2+ pages need it.
- Per-page `<style>` blocks may still override global rules (they come later in the cascade).

## Encoding

All HTML is UTF-8 with CRLF line endings and no BOM. Never use PowerShell `Get-Content`/`Set-Content`
without explicit UTF-8 — `tools/sitelib.py` `read()`/`write()` handle this correctly.
`check.py` flags mojibake (`â€™`, `Â½`, U+FFFD, ...).

## What is not deployed

`.gitignore` excludes `*.docx *.pdf *.py *.ps1 *.bak`, `Student Work/`, `scratch-*`, `backup-*`, `debug_*`,
`test_*`. `tools/*.py` is explicitly re-included. Remember: adding a pattern to `.gitignore` does not
untrack already-committed files — use `git rm --cached`.
