# Playbook: Textbook Edit

## Read First

`../VOICE.md`; the chapter's row in `SITE_ATLAS.md`; the whole page being edited; the matching skill in `../.devin/skills/` for any craft claim.

## Steps

1. Identify the section by its number. Confirm the `toc-number`, the `<h1>`, and the `<h2>` sequence before editing.
2. Keep Sharman prose as written unless the task is to change it. New prose follows the Sharman voice with no em dashes.
3. Any film may be cited for teaching. A film paired with a technique must show that technique on screen. If the pairing cannot be verified, stop and ask.
4. Every image or video the prose refers to must exist on the page and on disk.
5. If the edit touches anything a quiz covers, list the affected quiz in the report. Do not edit the quiz.
6. Run `python tools/build.py` if CSS, JS, or partials changed; run `python tools/check.py`; review `git diff` for the page.

## Checks

Numbering contiguous; `<h2>` inside `.textbook-content`; chapter still ends on a closing paragraph; no em dash added; no build region edited by hand; line endings unchanged.
