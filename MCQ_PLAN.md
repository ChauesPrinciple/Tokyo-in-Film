# Multiple-Choice Question Generation Plan

**Goal:** Produce real, factual, term-based multiple-choice questions drawn directly from the Tokyo in Film textbook content pages. Questions must be grounded in actual text on the page — no invented facts, no vibe-based questions.

---

## 1. Target pages (content only, not assignment/journal pages)

| # | Section | Page | Topic |
|---|---------|------|-------|
| 1 | Pre-production | `pre-production/narrative.html` | Story, script, genre |
| 2 | Pre-production | `pre-production/mise-en-scene.html` | Pre-shoot mise-en-scène |
| 3 | Pre-production | `pre-production/cinematography.html` | What to understand before you shoot |
| 4 | Production | `production/mise-en-scene.html` | Mise-en-scène on set |
| 5 | Production | `production/cinematography.html` | Cinematography on set |
| 6 | Production | `production/sound-design.html` | Sound on set / production sound |
| 7 | Post-production | `post-production/sound-design.html` | Post sound, mixing, design |
| 8 | Post-production | `post-production/editing-and-animation.html` | Editing theory and practice |
| 9 | Post-production | `post-production/animated-films.html` | Animated films |

> Note on pre-production "script and genre": `script.html` is the assignment page. The actual textbook content covering story, script, and genre lives in `narrative.html`. Plan uses `narrative.html`. Confirm if you'd rather pull from `script.html` instead.

---

## 2. Per-page workflow (repeated for all 9 pages)

### Step A — Read the full page
- Read the HTML top to bottom.
- Ignore nav, footer, and decorative markup.
- Extract only the pedagogical body text: headings, paragraphs, callouts, captions, lists, pull quotes.

### Step B — Extract a "fact bank"
For each page, produce a structured list of:
- **Defined terms** (e.g., "rack focus," "Foley," "180-degree rule," "diegetic sound")
- **Named people** (directors, DPs, editors, composers) and what they're credited with
- **Named films** and the specific technique/fact attached to them
- **Numbered rules or ratios** (3-point lighting, rule of thirds, 24 fps, key-to-fill ratios, aspect ratios)
- **Cause/effect claims** ("X happens because Y")
- **Historical dates or firsts** (Lumière, Edison, Kurosawa, etc.)

Each fact gets a source anchor: section heading + nearest paragraph.

### Step C — Draft MCQs from the fact bank
- **8–12 questions per page** (more for the longer pages: pre-prod cinematography, prod cinematography, post-prod sound and editing).
- Every question must be answerable **only from the page** — no outside trivia.
- Each question:
  - **Stem:** clear, one idea, no trick wording
  - **4 options** (A–D)
  - **1 correct answer**
  - **3 distractors** that are (a) plausible, (b) drawn from the same page's vocabulary when possible, (c) not obviously wrong by length or grammar
- Mix question types:
  - **Definition** ("Which of the following best defines _______?")
  - **Attribution** ("Which director is associated with _______?")
  - **Application** ("A filmmaker wants _______. Which technique accomplishes this?")
  - **Identification** ("Which film is cited as an example of _______?")
  - **Rule/ratio** ("The rule of thirds divides the frame into _______.")

### Step D — Verification pass
For each question, re-open the source page and confirm:
- [ ] The correct answer appears verbatim or is unambiguously paraphrased on the page
- [ ] No distractor is accidentally also correct
- [ ] No distractor contradicts a verified fact elsewhere in the textbook
- [ ] Vocabulary matches how the term is used on the page

### Step E — Record in the bank file
Append to `MCQ_BANK.md` under the page's section with the format:

```
### Q[N]. [Question stem]
- A) …
- B) …
- C) …
- D) …
**Answer:** [letter]
**Source:** [page path] — [section heading]
```

---

## 3. Execution order

Suggested run order (shortest → longest to build momentum, and keeping related topics adjacent):

1. `production/sound-design.html` (19 KB)
2. `post-production/sound-design.html` (44 KB)
3. `pre-production/mise-en-scene.html` (43 KB)
4. `production/mise-en-scene.html` (59 KB)
5. `pre-production/narrative.html` (48 KB)
6. `post-production/editing-and-animation.html` (49 KB)
7. `post-production/animated-films.html` (55 KB)
8. `pre-production/cinematography.html` (77 KB)
9. `production/cinematography.html` (82 KB)

Each page is one working session: read → fact bank → draft → verify → commit to `MCQ_BANK.md`.

---

## 4. Deliverables

- `MCQ_BANK.md` — master file, one H2 section per page, all questions + answers + source anchors
- `MCQ_FACTS.md` (optional, intermediate) — per-page fact banks, useful for future reuse (study guides, flashcards, exam variants)
- Target total: ~**80–100 questions** across the 9 pages

---

## 5. Ground rules (non-negotiable)

- No hallucinated films, directors, or technical claims. If it's not on the page, it doesn't become a question.
- No opinion questions ("Which scene is most effective?"). Factual/term-based only.
- No 2026 class-list gatekeeping here — these are textbook content pages, any film referenced in the text is fair game (per the audit rule).
- Preserve Sharman's terminology exactly when it's distinctive (e.g., if he calls it "the Kuleshov effect," the MCQ uses that phrasing).

---

## 6. Open questions before starting

1. Use `narrative.html` for "script and genre," or `script.html`, or both?
2. Target difficulty: undergraduate intro level, or mixed (some recall + some application)?
3. Do you want the final output also exported as a quiz-ready format (e.g., Canvas/Quizlet/plain CSV), or Markdown-only for now?
