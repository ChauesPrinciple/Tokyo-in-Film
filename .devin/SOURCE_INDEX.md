# SOURCE INDEX — Tokyo in Film Agent Knowledge Base

**Purpose**: This file is the master registry of every text-based source the agent draws on for film-craft claims. Every citation in any skill, workflow, or AGENT.md section must reference a key from this registry. If a claim cannot be backed by a source here, it must be tagged `[general-knowledge]` or `[needs-citation]` per `CITATION_PROTOCOL.md`.

**Update rule**: Any new source added to `class_resources/` (or extracted to `class_resources/_extracted_text/`) must be added to this registry before any skill or workflow can cite it.

---

## Citation Key Format

`[PrimaryAuthor:ShortTitle locator]`

- **Locator for PDFs**: `p.NNN` (e.g., `p.112`)
- **Locator for EPUBs**: `split_NNN` (e.g., `split_033`) — the extracted HTM file index
- **Locator for video sources**: `[VideoKey @ MM:SS]` (requires transcription pass first)

Examples:
- `[Frierson:EditingTheory p.112]`
- `[McKee:Story split_033]`
- `[Cameron:Masterclass ep.04 @ 12:30]` (pending transcription)

---

## Source Registry

### Tier 1 — Primary Course Textbook

| Citation Key | Title | Author | Format | Path | Status |
|---|---|---|---|---|---|
| `[FilmCheckingContent]` | *Moving Pictures: An Introduction to Cinema* (Sharman, course-adapted excerpt) | Russell Sharman (LibreTexts) | PDF (extracted) | `Film checking content.pdf` | text-readable, 137 pp |

This is the source textbook the Tokyo in Film website is adapted from. **All website prose decisions ultimately defer to this source.**

### Tier 2 — Editorial Theory

| Citation Key | Title | Author | Format | Path | Status |
|---|---|---|---|---|---|
| `[Frierson:EditingTheory]` | *Film and Video Editing Theory: How Editing Creates Meaning* | Michael Frierson | PDF (extracted) | `class_resources/Film and Video Editing Theory…/` | text-readable, 346 pp |
| `[Dmytryk:OnFilmEditing]` | *On Film Editing: An Introduction to the Art of Film Construction* | Edward Dmytryk | PDF (scanned) | `class_resources/On Film Editing…/` | **OCR REQUIRED** — 81 pp, 100% scanned image-only |
| `[GreatCourses:EffectiveEditing]` | *Effective Editing: How to Take Your Writing to the Next Level* | The Great Courses (writing-craft, not film) | PDF (extracted) | `class_resources/Effective Editing…/` | text-readable, 122 pp; **note: this is writing/prose editing, not film editing** |

### Tier 3 — Screenwriting Canon

| Citation Key | Title | Author | Format | Path | Status |
|---|---|---|---|---|---|
| `[McKee:Story]` | *Story: Substance, Structure, Style and the Principles of Screenwriting* | Robert McKee | EPUB (HTM split) | `class_resources/Story_…McKee EPUB/_extracted/` | text-readable, 134 split files |
| `[Trottier:ScreenwritersBible]` | *The Screenwriter's Bible, 6th Edition* | David Trottier | EPUB (HTM split) | `class_resources/The Screenwriter's Bible…/_extracted/` | text-readable |
| `[Tomlinson:PlotBasics]` | *Plot Basics: Plot Your Novel or Screenplay in Eight Sequences* | Paul Tomlinson | EPUB (HTM split) | `class_resources/Plot Basics…/_extracted/` | text-readable |
| `[Walley:TurnAndBurn]` | *Turn & Burn: The Scriptwriter's Guide to Writing Better Screenplays Faster* | CJ Walley | EPUB (HTM split) | `class_resources/Turn & Burn…/_extracted/` | text-readable |
| `[Thomas:BestAmericanScreenplays]` | *Best American Screenplays: Complete Screenplays, First Series* | Sam Thomas (ed.) | PDF (extracted) | `class_resources/Best American Screenplays…/` | text-readable, 552 pp; **primary source — actual produced screenplays for format reference** |

### Tier 4 — Production Practice

| Citation Key | Title | Author | Format | Path | Status |
|---|---|---|---|---|---|
| `[DigitalFilmmaking]` | *Digital Filmmaking for Beginners: A Practical Guide to Video Production* | (unattributed in extract) | PDF (extracted) | `Digital Filmmaking for Beginners…pdf` (root) | text-readable, 201 pp |
| `[Filmmaking:MakingAFilm]` | *Filmmaking: Making A Film — Financing, Hire Crew And Cast, Shooting And Editing Techniques* | (multi-author / Dummies-format) | PDF (extracted) | `class_resources/Filmmaking - Making A Film…/` | text-readable, 451 pp |
| `[JCam:InstructorGuide]` | *JCam Instructor Guide* | Adobe / educator-supplied | PDF (extracted) | `class_resources/JCam_instructor_guide_complete_en_US_pdf.pdf` | text-readable, 56 pp; **18% scanned pages** (interspersed) |

### Tier 5 — Video / Audio (NOT yet text-extracted)

| Citation Key | Title | Author | Format | Path | Status |
|---|---|---|---|---|---|
| `[Cameron:Masterclass]` | *James Cameron Teaches Filmmaking* | James Cameron (MasterClass) | 15 .mkv files | `class_resources/Masterclass - James Cameron…/` | **NOT TEXT-EXTRACTED** — requires transcription pass (Whisper or similar) |
| `[StoryboardingCourse]` | Professional Storyboarding course (6 modules) | (course materials in folders 1–6) | folder bundles, mostly visual | `class_resources/[1-6]/` | **partial** — text extracts in some PDFs, video lessons not yet transcribed |

### Tier 6 — Video Editing Tutorials (NOT yet text-extracted)

| Citation Key | Title | Format | Status |
|---|---|---|---|
| `[Skillshare:BasicsOfVideoEditing]` | Skillshare *Basics of Video Editing — Turn Your Idea into a Film!* | video course | **NOT TEXT-EXTRACTED** |

---

## Sources OUTSIDE the local corpus (commonly invoked but not verifiable here)

These are works the agent should **not cite as if grounded** — claims must be tagged `[external-source: <work>]` and treated as `[needs-citation]` for retrieval-against-local-corpus. If we acquire and extract them later, they get promoted into the registry above.

- **Murch, *In the Blink of an Eye*** — Frierson summarizes Murch's Six Criteria on `[Frierson:EditingTheory p.112]`, but the often-quoted percentages (Emotion 51% / Story 23% / Rhythm 10% / Eye-trace 7% / 2D 5% / 3D 4%) are **NOT** in the extracted corpus. Treat any percentage claim about Murch's hierarchy as `[external-source: Murch, In the Blink of an Eye — not in local corpus]`.
- **Bordwell, *Narration in the Fiction Film*** — referenced inside Frierson Ch.4 but not in standalone form.
- **Zettl, *Sight Sound Motion*** — Zettl's vector theory is summarized inside Frierson Ch.1 (`[Frierson:EditingTheory p.20–p.50]`); the standalone Zettl text is not in the corpus.
- **Eisenstein, *Film Form* / *Film Sense*** — referenced inside Frierson Ch.5 but not standalone.
- **Field, *Screenplay*** — three-act-structure citations attributed to Syd Field commonly appear; Field's actual book is not in the corpus.

---

## How to Search the Corpus

A search helper script lives at `$env:TEMP\search_corpus.py` (rebuilt as needed — `*.py` is gitignored, so the canonical version is also kept inline in this index for reproducibility).

```
py -3.13 $env:TEMP\search_corpus.py "QUERY"           # search all books
py -3.13 $env:TEMP\search_corpus.py "QUERY" --book Frierson_EditingTheory
py -3.13 $env:TEMP\search_corpus.py "QUERY" --max 8 --context 200
```

**Always run the search before writing a citation.** If the query returns no hits in any book, the claim is not grounded in the local corpus — flag it `[external-source]` or `[general-knowledge]`.

The script source is preserved at the end of `CITATION_PROTOCOL.md` for re-creation if `$env:TEMP` is wiped.

---

## OCR / Transcription Backlog

To unlock full citation coverage, these passes are pending:

1. **OCR Dmytryk *On Film Editing*** (81 pp, scanned). Requires Tesseract install + `pytesseract` + `pdf2image` (which needs Poppler binaries on Windows). Once done, register as `text-readable` and remove the OCR-required note above.
2. **Transcribe Cameron MasterClass** (15 episodes, ~9 hours). Requires Whisper or similar. Once done, locator format `[Cameron:Masterclass ep.NN @ MM:SS]`.
3. **Extract any embedded text from storyboarding course PDFs** in `class_resources/[1-6]/` if/when those become source-of-truth for storyboard skills.

Track this backlog in `progress.txt` if it's actively being worked.
