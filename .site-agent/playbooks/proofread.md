# Playbook: Proofread

## Scope

Every live page unless he names a narrower scope. Skip retired pages and redirect stubs. Field sheets in progress are proofread and reported, not edited.

## What Counts as an Error (fix)

- Misspellings, typos, doubled or missing words.
- Agreement, tense, and article errors.
- Punctuation errors: stray spaces before punctuation, unmatched quotes or parentheses, comma splices in new text.
- Wrong names or titles of films, people, and places, checked against the film list, IMDb links already on the site, and the page's own usage.
- Inconsistent spelling of the same term on one page (mise-en-scène, Kuleshov, afureko).
- Mojibake and broken characters.

## What Is Not an Error (leave)

- The Sharman voice: parenthetical asides, jokes, sentence fragments used for rhythm, em dashes in original Sharman prose.
- Films from earlier years on assignments or textbook chapters.
- Style preferences that are not mistakes. Report them as suggestions if they matter; do not apply them.

## Steps

1. `manager.py route "proofread ..."`, then `manager.py snapshot`.
2. Extract each page's visible text (and the data files that feed visible text: `filmData`, map JSON, glossary JSON) and run a spelling pass with a site word list (Japanese names, film titles, craft terms).
3. Read every page in full. The spelling pass finds candidates; reading finds the rest.
4. Fix errors in place with a read-modify-write that preserves encoding and line endings. One correction per replacement, matched exactly.
5. `python3 tools/check.py`, then `manager.py validate` with a change report that lists every correction by file.
6. Report: corrections made (file, before, after), suggestions not applied, and anything left for him to decide.
