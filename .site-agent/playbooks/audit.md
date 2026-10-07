# Playbook: Audit

## Steps

1. Name the scope (one page, one phase, assignments only, maps, or the whole site).
2. Compare each page in scope with its row in `SITE_ATLAS.md`, the film list in `../VOICE.md`, and the page-type rules in `IDENTITY.md`.
3. Run `python tools/check.py`.
4. Report findings ranked by what a student would see first: wrong or retired films on live assignment pages, broken links, factual errors, numbering, then style and code.
5. Fix nothing during an audit. Update `SITE_ATLAS.md` only where the atlas itself is wrong.
