# Tokyo in Film — Voice & Editorial Guide

This file is the first thing Cascade (or any collaborator) should read before writing, editing, or proofing textbook prose. It exists because the textbook has a specific voice, a specific film canon, and a specific numbering system, none of which survive well in session summaries.

---

## 1. Voice

The textbook is adapted from Russell Sharman's *Moving Pictures: An Introduction to Cinema*. Keep that voice when writing or revising prose.

**Sharman voice, in one sentence:** a warm professor who talks to the reader directly, cracks self-aware jokes, and is not afraid of a parenthetical aside.

**Hallmarks to preserve:**

- **Second person.** "You are in a coffee shop." "Your future editor will thank you." Not "the reader" or "one."
- **Parenthetical asides.** *(Which, frankly, is just rude. I expect your undivided attention!)* / *(C'mon, location sound recordist, you had one job!)* / *(How's that, sound editors? Feel better now?)*
- **Self-correction and wink.** Sentences that second-guess themselves in the next breath. *"Sorry, did I say catching? I meant wrestling with."*
- **Short declarative sentences mixed with longer ones.** The rhythm breathes.
- **Named films do heavy lifting.** Prefer a specific film doing a specific thing over abstract technique-talk.
- **Student quotes are sacred.** They are blockquoted, attributed, and never paraphrased into body text.

**Anti-patterns (don't write like this):**

- "Taken together, the production-side decisions covered in this chapter are…" — textbook-summary cadence. Flat.
- "It is important to note that…" — academic stall.
- Wikipedia-neutral third person when a human agent is available.

---

## 2. Em-dash policy

**Do not add em dashes (—) to new prose.** Existing Sharman text contains some and those stay. New material should use:

- A period and a new sentence.
- A comma, colon, or semicolon.
- A parenthetical.

This is a personal style choice of the course owner. Follow it without debate.

---

## 3. 2026 Film Canon

The course rotates films each year. **When citing films in examples, use only films on the current year's list.** As of August 2026:

**In canon (the 16-slide 2026 studied-film list, authoritative source is `textbook.html`):**

- *13 Assassins* (2010)
- *Akira* (1988)
- *Bullet Train* (2022)
- *Chainsaw Man: Reze Arc* (2025)
- *Exit 8* (2025)
- *Initial D* (2005, live-action)
- *Jiro Dreams of Sushi* (2011)
- *Ju-On: The Grudge* (2002)
- *Jujutsu Kaisen* (2020, anime)
- *Outrage* (2010)
- *Ramen Heads* (2017)
- *Rashomon* (1950)
- *Rental Family* (2025)
- *Rurouni Kenshin: Final Chapter Part II - The Beginning* (2021)
- *Tampopo* (1985)
- *Your Name* (2016)

**August 2026 revision:** removed *Godzilla Minus One*, *Howl's Moving Castle*, *Kubi*, *Suzume*, *The Seven Samurai*, *Tokyo Drift*, *Tokyo Ghoul*, *Tsukigakirei*; added *Ju-On: The Grudge*, *Jujutsu Kaisen*, *Outrage*, *Rashomon*, *Rental Family*, *Rurouni Kenshin: Final Chapter Part II - The Beginning*, *Tampopo*. The list is synced in all three places (`index.html` slides, `index.html` JS `filmData`, `textbook.html` slides). **Assignment/journal pages have NOT yet been updated to this list.** They still cite the previous canon and are scheduled for a full overhaul; do not treat their "Films to Choose From" lists as current.

**Textbook vs assignment (critical):** This studied-film list governs **assignment/journal pages and their "Films to Choose From" lists only** (`catharsis.html`, `visual-foreshadowing.html`, `rhythm-of-process.html`, `shot-list.html`, `storyboard.html`, `script.html`, `animatic.html`, `pilgrimage-shots.html`). **Textbook/teaching pages may cite ANY film** for teaching purposes (e.g., *Shoplifters*, *Spirited Away*, *Drive My Car*, *My Neighbor Totoro*, *Castle in the Sky* are valid teaching examples and must NOT be swapped out or replaced with invented details).

**Pairing discipline:** examples that pair a technique with a film must actually contain that technique in that film. No lazy pairings. *The Seven Samurai* has no empty station corridors. *Initial D* has no severed heads. Verify before writing.

---

## 4. Chapter Numbering

The textbook uses a three-level decimal scheme:

- `1.x` — Pre-Production
- `2.x` — Production
- `3.x` — Post-Production

Within each chapter: `<h1>` is the chapter title, `<h2>` uses the numbered form (e.g., `2.3.1 Lighting`), `<h3>` uses sub-numbers (e.g., `2.3.1.1`).

**Rules:**

- Numbering must be contiguous. An orphan `3.4.2.2` with no `3.4.2.1` is a bug.
- The `<span class="toc-number">X.Y</span>` above the `<h1>` must match the chapter number.
- `<h2>` section headings belong **inside** `.textbook-content`, not between the `<h1>` and the content div.

---

## 5. Page Structure Conventions

- **Nav `active` class:** mark the active link only when a nav item actually corresponds to the current page. Utility pages (`textbook.html`, `glossary.html`, `free-guides.html`) mark nothing active.
- **`.art-banner-wrap`** is an intentional styled div with a CSS background (`art-corner-banner.gif`) and `min-height: 150px`. The `&nbsp;` inside is placeholder content, not a bug.
- **Chapter closers:** every textbook chapter should end with a paragraph that wraps the chapter in voice, not an abrupt technical sentence.
- **Images referenced in prose must exist.** A sentence like "Here is a still from…" must be followed by the image.

---

## 6. Live Pages vs Assignment Pages

As of April 2026:

- **Live (students see these):** `textbook.html`, phase landing pages (`pre-production/index.html` etc.), all guide chapter pages (`*/guide.html`, `*/cinematography.html`, `*/sound-design.html`, `*/narrative.html`, etc.), `glossary.html`, `free-guides.html`.
- **Not live (scaffolding, may contain duplicated or outdated content):** most individual assignment pages (`storyboard.html`, `shot-list.html`, `animatic.html`, `pilgrimage-shots.html`, etc.).

**Consequence:** when removing duplicated content, remove it from the live pages first. Do not go fishing in non-live assignment pages unless asked.

---

## 7. Encoding & Bulk Edits

- **Never use plain PowerShell `Get-Content` for bulk HTML edits.** It mangles UTF-8. Use `[System.IO.File]::ReadAllText` / `WriteAllText` with explicit UTF-8 encoding, or write a `.ps1` script.
- **Single-file edits:** use the IDE's `edit` tool with exact string matches. Safer than PowerShell.

---

## 8. Deployment

- **Repo:** `https://github.com/ChauesPrinciple/Tokyo-in-Film.git`
- **Local branch:** `main`
- **Push:** `git push origin main`
- **Live site:** https://chauesprinciple.github.io/Tokyo-in-Film/ — served from `origin/main`, rebuild takes ~1 minute.
- `.nojekyll` at repo root is required; do not delete it.
- **Current CSS version cache-bust:** `style.css?v=21`

---

## 9. Fonts (Locked)

Do not change these without explicit instruction:

- `h1` — SDGlitch, uppercase, letter-spacing
- `h2` — Cinzel, serif (**intentional, do not swap**)
- `h3`–`h6` — Inter 600
- body — Inter via `var(--font-body)`
- Saiba45 is declared as `@font-face` but **not applied anywhere**. Do not apply it.

---

## 10. Before Writing Any New Prose, Ask

1. Am I in second person where possible?
2. Did I leave any em dashes in? Kill them.
3. Is the film I am citing on the 2026 canon list?
4. Does the specific pairing (film ↔ technique, film ↔ location) actually hold up?
5. Does this paragraph end on a beat that feels like Sharman, or like a summary machine?

If any answer is "no" or "I'm not sure," re-read the surrounding chapter before shipping.
