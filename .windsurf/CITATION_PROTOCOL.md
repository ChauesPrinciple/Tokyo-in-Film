# CITATION PROTOCOL — Hallucination Guard for the Tokyo in Film Agent

**Mandate**: Every film-craft factual claim emitted by any skill, workflow, AGENT.md section, or chat reply must be traceable to a verified source — or explicitly tagged as un-grounded.

The user's instruction in plain language: *"connect specific pages and passages with quick link references for recall — force reference and cross reference to create a real working brain."*

This protocol is the mechanism that enforces it.

---

## Why this exists

Before this protocol, the agent's film-craft claims came from training-data summaries that *resembled* the source texts but could not be verified against them. Three concrete problems:

1. **Phantom precision.** AGENT.md asserted Murch's "51% / 23% / 10% / 7% / 5% / 4%" hierarchy. Those exact percentages do not appear anywhere in the local extracted corpus. They may be real Murch — but the agent cannot prove it from sources at hand. Asserting them as canon is hallucination by paraphrase.
2. **TOC vs body confusion.** Frierson's table of contents lists "Murch: Six Criteria for the Ideal Cut p.93." The actual content is on PDF page 112. A summary-from-memory citation would write `p.93` and be wrong.
3. **Source drift.** Skills cite "Frierson," "Dmytryk," "Zettl," "Bordwell" interchangeably. Without locators, two contradictory claims could each be "from Frierson" and there's no way to adjudicate.

This protocol fixes all three by mandating retrieval-before-claim.

---

## The Three-Tier Claim Tagging System

Every factual film-craft claim must carry exactly one of these tags (inline, immediately after the claim or at the end of the bullet/paragraph):

### Tier 1: `[grounded]` — verified against local corpus

Format: `[SourceKey locator]`

The claim is verified against the extracted text of a source registered in `SOURCE_INDEX.md`. The locator points to a specific page (PDF) or split file (EPUB).

Examples:
- "Murch's Six Criteria for the Ideal Cut: emotion, story, rhythm, eye-trace, planarity (2D / 180° line), three-dimensional continuity. `[Frierson:EditingTheory p.112]`"
- "McKee distinguishes Premise (the inspiring question) from Controlling Idea (the story's ultimate meaning expressed through last-act climax). `[McKee:Story split_033]`"

**Rule**: If you can quote it or closely paraphrase it from a real page in the corpus, tag `[grounded]`-style and you must have actually verified it (run the search; read the page) within the current session.

### Tier 2: `[external-source: <Work>]` — real source, not in local corpus

Format: `[external-source: Author, Title]`

The claim references a real, widely-cited work that is **not** in our extracted corpus. The agent may use it but must flag it so the user knows the locator cannot be trusted at page-level granularity.

Examples:
- "Murch attributes weighted importance to the cut's six criteria, with emotion ranked far above continuity. `[external-source: Murch, In the Blink of an Eye — not in local corpus]`"
- "Field's three-act structure places the inciting incident around minute 25–27. `[external-source: Field, Screenplay]`"

**Rule**: Acceptable for general framing, **never** acceptable for specific quoted figures, percentages, or page-level claims unless paired with a `[grounded]` corroboration from a source that summarizes the external work (e.g., Frierson summarizing Murch).

### Tier 3: `[general-knowledge]` — common craft knowledge, no specific source

Format: `[general-knowledge]`

Widely-accepted craft knowledge that doesn't come from a single canonical source. Use sparingly.

Examples:
- "Tungsten light is approximately 3200K; daylight is approximately 5600K. `[general-knowledge]`"
- "A typical screenplay page reads at roughly one minute of screen time. `[general-knowledge]`"

**Rule**: If a claim could plausibly come from any of half a dozen filmmaking textbooks and is not contested across the field, `[general-knowledge]` is acceptable. If the claim is specific (a quoted figure, a named technique, a director's stated philosophy), `[general-knowledge]` is **not** acceptable — go find the source.

### Forbidden: `[needs-citation]` — temporary scaffolding only

Format: `[needs-citation: <what would need verifying>]`

This is a self-flag the agent applies to its own output when it cannot complete a citation in the moment. It is **not** acceptable in delivered final output. It signals an open todo.

Example (in draft only):
- "The 180-degree rule was first formalized in early sound-era Hollywood. `[needs-citation: who and when]`"

If a `[needs-citation]` tag remains at the end of a session, it must be either resolved (upgraded to one of Tiers 1–3) or the claim must be rewritten to remove the un-grounded specificity.

---

## When the Protocol Triggers

The protocol applies whenever the agent emits a factual claim about:

- **Film theory** (montage, mise-en-scène, vector theory, narrative structure, Kuleshov, etc.)
- **Named techniques** (Murch's Six Criteria, Dmytryk's Six Rules, the rule of thirds, the 180-degree rule, etc.)
- **Industry practice** (camera departments, sound recording standards, edit assembly conventions)
- **Specific data** (frame rates, color temperatures, focal length ranges, aspect ratios, duration norms)
- **Director / theorist attributions** (anything ascribed to a specific person)
- **Course-textbook claims** (anything from `Film checking content.pdf` / Sharman)

The protocol does **not** apply to:

- Subjective craft opinions clearly framed as such ("In my view," "A common approach is to…")
- General prose about the project (Tokyo, the trip, deployment)
- Code comments and technical documentation

---

## The Search-Before-Cite Rule

Before writing a `[grounded]` citation, the agent must run the corpus search:

```
py -3.13 $env:TEMP\search_corpus.py "QUERY" [--book KEY] [--max N] [--context N]
```

If the search returns no hits in the named source, the citation may not be `[grounded]` — it must be downgraded to `[external-source]` or `[general-knowledge]`, or the claim must be rewritten or removed.

If the search returns hits but they are TOC entries (page numbers like 9, 8, 2) rather than body content, the agent must read the actual referenced page (the body content, e.g., p.112 for Murch in Frierson) and cite the body page, **never** the TOC page.

---

## Cross-Reference Discipline

When two sources address the same concept, both should be cited where possible:

> Cutting on motion hides the cut because the eye follows the movement, not the frame change. `[Dmytryk:OnFilmEditing p.??]` *(pdf-needs-ocr)* — also summarized in `[Frierson:EditingTheory p.112]` as "Dmytryk's Rule 6: Cut for Proper Values Rather Than for Proper 'Matches.'"

This serves two functions:
1. It surfaces when one source is summarizing another (so we can distinguish primary from secondary).
2. It exposes when two ostensibly separate authorities are actually saying the same thing — useful for triangulation, dangerous if mistaken for independent confirmation.

---

## Skill `## Sources` Block — Required Template

Every skill in `.windsurf/skills/<skill-name>/skill.md` must end with a `## Sources` section listing the citation keys it draws on. Example:

```markdown
## Sources

This skill grounds its claims in the following entries from `SOURCE_INDEX.md`:

- **Primary**: `[Frierson:EditingTheory]`, `[Dmytryk:OnFilmEditing]` *(pdf-needs-ocr)*
- **Cross-reference**: `[Filmmaking:MakingAFilm]`, `[GreatCourses:EffectiveEditing]` *(note: writing-craft, not film-craft)*
- **External (un-grounded locally)**: `[external-source: Murch, In the Blink of an Eye]`
- **Course textbook**: `[FilmCheckingContent]` (Sharman)

Specific claims with locators appear inline throughout the skill body. If a claim in the body lacks a tag, that is a protocol violation — flag and resolve before delivery.
```

---

## Workflow `## Sources` Block

Workflows that issue craft instructions (e.g., `/script-diagnosis`, `/coverage-strategy`, `/editorial-assembly`) must include a `## Sources` section at the end naming the underlying skills (each of which carries its own source list) plus any direct citations the workflow makes itself.

Workflows that are purely procedural (e.g., `/deploy-updates`, `/integrate-trip-locations`) are exempt — they don't make film-craft claims.

---

## AGENT.md Citation Discipline

The `## Source-Verified Production Principles` section in `AGENT.md` is the most-read and most-quoted portion of the agent framework. It must be the most rigorously cited.

Every bullet in that section must end with a `[grounded]`, `[external-source]`, or `[general-knowledge]` tag. No bullet may be untagged.

The audit pass that retrofits this is recorded as a commit message: `AGENT.md: enforce citation discipline on source-verified principles`.

---

## What "Force Cross-Reference" Means in Practice

Per the user's instruction, the agent should — when emitting any non-trivial film-craft claim — actively look for the *second* source that addresses it, not just the first.

Workflow:

1. Identify the claim (e.g., "the 180-degree rule").
2. Run search across all books, not just the obvious one. (`py -3.13 search_corpus.py "180-degree"` returned hits in both `[Frierson:EditingTheory]` and `[Filmmaking:MakingAFilm]` — different framings of the same concept.)
3. Cite both. Note where they agree, note where they diverge.
4. If only one source mentions it, that's a one-source claim — flag it as such if relevance is high (e.g., "Only `[Frierson:EditingTheory]` discusses Zettl's z-axis vector theory in the local corpus; the standalone Zettl text is not extracted").

This converts the agent from a single-pass paraphrase engine into a cross-checking instrument.

---

## Search Helper Script (for re-creation)

This is the reproducible script kept inline so it can be regenerated if `$env:TEMP\search_corpus.py` is wiped. Write to `$env:TEMP\search_corpus.py` (the workspace `.gitignore` blocks `*.py` writes via the IDE edit tools — that's intentional; tools live in TEMP).

```python
"""Search the extracted PDF + EPUB corpus for a query, returning ranked matches.

Usage:
    py -3.13 search_corpus.py "controlling idea"
    py -3.13 search_corpus.py "180 degree rule" --book Frierson_EditingTheory
    py -3.13 search_corpus.py "inciting incident" --max 8 --context 2
"""
from __future__ import annotations
import argparse, re, sys
from pathlib import Path

ROOT = Path(r"c:\Users\rober\CascadeProjects\tokyo-in-film")
PDF_TEXT_ROOT = ROOT / "class_resources" / "_extracted_text"
EPUB_ROOT = ROOT / "class_resources"

PDF_BOOKS = {
    "Frierson_EditingTheory": ("Frierson:EditingTheory", "p"),
    "Dmytryk_OnFilmEditing": ("Dmytryk:OnFilmEditing", "p"),
    "GreatCourses_EffectiveEditing": ("GreatCourses:EffectiveEditing", "p"),
    "DigitalFilmmakingForBeginners": ("DigitalFilmmaking", "p"),
    "Filmmaking_MakingAFilm": ("Filmmaking:MakingAFilm", "p"),
    "Thomas_BestAmericanScreenplays": ("Thomas:BestAmericanScreenplays", "p"),
    "JCam_InstructorGuide": ("JCam:InstructorGuide", "p"),
    "FilmCheckingContent": ("FilmCheckingContent", "p"),
}

EPUB_BOOKS = {
    "McKee:Story": EPUB_ROOT / "Story_ Substance, Structure, Style and the Principles of Screenwriting by Robert McKee EPUB" / "Story_ Substance, Structure, Style and the Principles of Screenwriting by Robert McKee_extracted",
    "Trottier:ScreenwritersBible": EPUB_ROOT / "The Screenwriter's Bible 6th Edition (20th Anniversary) - A Complete Guide to Writing, Formatting and Selling Your Script (Epub & Mobi) Gooner" / "The Screenwriter's Bible, 6th E - David Trottier_extracted",
    "Tomlinson:PlotBasics": EPUB_ROOT / "Plot Basics_ Plot Your Novel or Screenplay in Eight Sequences by Paul Tomlinson EPUB" / "Plot Basics_ Plot Your Novel or Screenplay in Eight Sequences by Paul Tomlinson_extracted",
    "Walley:TurnAndBurn": EPUB_ROOT / "Turn & Burn_ The Scriptwriter's Guide to Writing Better Screenplays Faster by CJ Walley EPUB" / "Turn & Burn_ The Scriptwriter's Guide to Writing Better Screenplays Faster by CJ Walley_extracted",
}

HTML_TAG = re.compile(r"<[^>]+>")
WHITESPACE = re.compile(r"\s+")

def strip_html(s):
    s = HTML_TAG.sub(" ", s)
    s = (s.replace("&nbsp;", " ").replace("&amp;", "&").replace("&lt;", "<")
           .replace("&gt;", ">").replace("&#8217;", "'").replace("&#8220;", '"').replace("&#8221;", '"'))
    return WHITESPACE.sub(" ", s).strip()

def search_pdf_book(key, citation, locator_kind, query, max_hits, context_chars):
    folder = PDF_TEXT_ROOT / key
    if not folder.exists(): return []
    hits, pat = [], re.compile(re.escape(query), re.IGNORECASE)
    for pg in sorted(folder.glob("page_*.txt")):
        try: text = pg.read_text(encoding="utf-8")
        except Exception: continue
        for m in pat.finditer(text):
            page_num = int(pg.stem.split("_")[1])
            start, end = max(0, m.start() - context_chars), min(len(text), m.end() + context_chars)
            hits.append({"locator": f"[{citation} {locator_kind}.{page_num}]",
                         "snippet": WHITESPACE.sub(" ", text[start:end]).strip()})
            if len(hits) >= max_hits: return hits
    return hits

def search_epub_book(citation, root_folder, query, max_hits, context_chars):
    if not root_folder.exists(): return []
    hits, pat = [], re.compile(re.escape(query), re.IGNORECASE)
    for htm in sorted(root_folder.glob("*split_*.htm")):
        try: raw = htm.read_text(encoding="utf-8", errors="ignore")
        except Exception: continue
        text = strip_html(raw)
        for m in pat.finditer(text):
            split_num = htm.stem.split("split_")[-1]
            start, end = max(0, m.start() - context_chars), min(len(text), m.end() + context_chars)
            hits.append({"locator": f"[{citation} split_{split_num}]",
                         "snippet": text[start:end].strip()})
            if len(hits) >= max_hits: return hits
    return hits

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("query"); ap.add_argument("--book", default=None)
    ap.add_argument("--max", type=int, default=5); ap.add_argument("--context", type=int, default=180)
    args = ap.parse_args()
    print(f"\n=== Searching for: {args.query!r} ===")
    total = 0
    for key, (citation, locator_kind) in PDF_BOOKS.items():
        if args.book and args.book not in (key, citation): continue
        hits = search_pdf_book(key, citation, locator_kind, args.query, args.max, args.context)
        if hits:
            print(f"\n-- {citation} ({len(hits)} hits) --")
            for h in hits: print(f"  {h['locator']}\n    \u2026{h['snippet']}\u2026")
            total += len(hits)
    for citation, folder in EPUB_BOOKS.items():
        if args.book and args.book != citation: continue
        hits = search_epub_book(citation, folder, args.query, args.max, args.context)
        if hits:
            print(f"\n-- {citation} ({len(hits)} hits) --")
            for h in hits: print(f"  {h['locator']}\n    \u2026{h['snippet']}\u2026")
            total += len(hits)
    print(f"\n=== Total: {total} hits ===")

if __name__ == "__main__":
    main()
```

---

## Failure Modes the Protocol Prevents

| Failure | Before Protocol | After Protocol |
|---|---|---|
| Quoted percentages without source | "Murch ranks emotion at 51%…" stated as canon | Tagged `[external-source]` until verified, or replaced with the verifiable Six-Criteria-as-ordered-list `[Frierson:EditingTheory p.112]` |
| TOC page cited instead of body | "Murch p.93" (TOC reference) | "Murch summarized at `[Frierson:EditingTheory p.112]`" (actual body content) |
| Two contradictory "from Frierson" claims | Unresolvable | One has a locator, one doesn't — locator wins, untagged claim is rewritten |
| Theory attributed to wrong author | "Eisenstein's vector theory" (it's Zettl's) | Search corpus, find Zettl summary in `[Frierson:EditingTheory p.20–p.50]`, attribute correctly |
| Skill A and Skill B contradict each other | No way to reconcile | Both must cite — adjudicated by source weight + recency |

---

## Enforcement Checklist (Pre-Delivery)

Before delivering any output that contains film-craft claims:

- [ ] Every factual claim carries a tag from the three-tier system.
- [ ] Every `[grounded]` tag has been verified by a corpus search **in this session**.
- [ ] No `[needs-citation]` tags remain in final output.
- [ ] When two sources address the same concept, both are cited (cross-reference discipline).
- [ ] When a claim relies on `[external-source]`, the user is informed it is un-grounded locally.
- [ ] If a claim cannot be tagged at any tier, it must be **rewritten or removed**, not silently emitted.

This checklist is the contract. Skipping it is a protocol violation.
