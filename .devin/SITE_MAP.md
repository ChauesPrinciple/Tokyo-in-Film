# Tokyo in Film — Canonical Site Map

**Purpose.** Verified page-by-page inventory of every live page: what it is, what chapter it carries, what films it cites, and what must stay in sync with what. Read this (plus `VOICE.md`) before editing any page so nothing is guessed, misaligned, or edited in the wrong place.

**Verified:** July 5, 2026 (full extraction of titles, toc-numbers, h1–h3 outlines, italic-cited films from all 46 live pages).

---

## 1. Page Types (the categories that govern editing rules)

| Type | Rule |
|---|---|
| **Canon list pages** | Carry the 16-slide 2026 studied-film list. Must match canon in `VOICE.md` §3 exactly. |
| **Textbook chapters** | Teaching prose (Sharman-adapted). May cite ANY film. Never swap films here. |
| **Assignment / journal pages** | "Films to Choose From" lists must contain ONLY 2026 canon films. |
| **Assignment scaffolds** | Non-live per VOICE.md §6. Do not fish here unless asked. |
| **Phase landings / utility** | Nav + card pages. No prose claims. |
| **Guide worksheets** | `guides/`. Standalone craft worksheets, no film-canon obligations. |

---

## 2. Root Pages

| Page | Type | Notes |
|---|---|---|
| `index.html` | Home + Canon list | H1 "CINEMA IN CONTEXT". Carries film list in **two places**: HTML slides (~line 260–390) AND JS `filmData` object (~line 514–715, with loglines, IMDb links, pages, locations, maps). |
| `textbook.html` | Canon list | Near-duplicate of index's course-module + film-list sections (slides only, no JS filmData). |
| `glossary.html` | Utility | Terms rendered by `js/glossary.js`. |
| `free-guides.html` | Utility | "Filmmakers Toolkit" cards → `guides/` pages + Catharsis (Seven Samurai) + Visual Foreshadowing (Bullet Train & Howl's) cards. |
| `scene-project.html` | Assignment (course capstone) | Recreate / Adapt / Create a scene; Film Coach; submission requirements. |
| `anime-map.html` | Utility | Interactive ward map (`?anime=` param: chainsaw_man, tokyo_ghoul, etc.). |

**SYNC RULE (critical):** Any film-list change must land in **three** places: `index.html` slides, `index.html` JS `filmData`, and `textbook.html` slides.

---

## 3. Pre-Production (`pre-production/`, chapters 1.x)

| Page | Chapter | Type | Sections / Films |
|---|---|---|---|
| `index.html` | — | Phase landing | Cards for 1.1–1.6. |
| `guide.html` | 1.1 | Phase student guide | In-class assignment tabs (Script / Storyboard / Shot List / Animatic roles) + Add Ons (Location Mini-Doc, Pilgrimage Shots Plan). Cites canon films only. |
| `how-to-watch.html` | 1.2 | Textbook | 1.2.1 What is Cinema → 1.2.4 Explicit/Implicit Meaning. Teaching cites incl. *Shoplifters*, *Spirited Away*, *Adrift in Tokyo* (allowed). |
| `narrative.html` | 1.3 | Textbook | 1.3.1 Screenplay → 1.3.7 Genre; Quiz 1. Heaviest teaching-film page (Rashomon, Perfect Blue, Joker, Pulp Fiction, etc. — allowed). 34 em-dashes (original Sharman prose; leave). |
| `mise-en-scene.html` | 1.4 | Textbook | 1.4.1 Setting / 1.4.2 Character / 1.4.3 Lighting / 1.4.4 Composition. |
| `cinematography.html` | 1.5 | Textbook | DP role, Types of Shots, lighting-ratio "Going Deeper"; Quiz 2. Understand-before-you-shoot half of the cinematography split. |
| `catharsis.html` | 1.6 | Assignment/journal | Anchor: *Seven Samurai*. Choose-from: 13 Assassins, Kubi, Godzilla Minus One, Chainsaw Man: Reze Arc. ✅ canon. |
| `script.html` | 1.1.1 | Scaffold (non-live) | Screenplay-format beat exercise. |
| `storyboard.html` | 1.1.2 | Scaffold (non-live) | Movement-driven scene boards. Cites 13 Assassins, Bullet Train, Your Name. ✅ canon. |
| `animatic.html` | 1.1.3 | Scaffold (non-live) | Timed sequence, advanced option. |
| `shot-list.html` | 1.1.4 | Scaffold (non-live) | Visual-logic shot breakdown. ✅ canon films only. |
| `pilgrimage-shots.html` | 1.1.5 | Scaffold (non-live) | Nikko / Kawagoe location recreation (Kubi, Seven Samurai, 13 Assassins). ✅ canon. |

---

## 4. Production (`production/`, chapters 2.x)

| Page | Chapter | Type | Sections / Films |
|---|---|---|---|
| `index.html` | — | Phase landing | Cards for 2.1–2.5. |
| `guide.html` | 2.1 | Phase student guide | In-class roles, Slice-of-Life vs Action options, Miniatures in Motion, Add Ons (Geometry Worksheet, Location Sound Log). ✅ canon. |
| `mise-en-scene.html` | 2.2 | Textbook | 2.2.1 Setting → 2.2.5 Cinematic Style; acting schools; voice acting in Japanese animation (seiyu). Teaching cites incl. Drive My Car, Shoplifters, Spirited Away, Castle in the Sky, Totoro (allowed). |
| `cinematography.html` | 2.3 | Textbook | On-set half of split: camera angles, lenses, DOF, tripod/handheld/Steadicam, speed of motion, acting for camera, close-ups; Quiz 3. |
| `sound-design.html` | 2.4 | Textbook | 2.4.1 Production Sound (single numbered section); Quiz 4. *The Jazz Singer* claim verified. |
| `visual-foreshadowing.html` | 2.5 | Assignment/journal | Dual anchors: *Bullet Train* (karmic setup/payoff, water-bottle chain, Thomas labels) + *Howl's Moving Castle* (time-loop, grey hair). Choose-from: Howl's, Tokyo Ghoul (**Shuhei Morita** — 2014 anime, per July 2026 decision), Your Name/Suzume, Tsukigakirei. ✅ canon. |

---

## 5. Post-Production (`post-production/`, chapters 3.x)

| Page | Chapter | Type | Sections / Films |
|---|---|---|---|
| `index.html` | — | Phase landing | Cards for 3.1–3.5. |
| `guide.html` | 3.1 | Phase student guide | Editing roles (Recut the Mood, Edit Like a Music Video, Match the Mood, Postmodern Kaiju Scene) + Add Ons (Favorite Place, Tokyo Reel). ✅ canon. |
| `sound-design.html` | 3.2 | Textbook | 3.2.1 Sound Editing / 3.2.2 Mixing / 3.2.3 Music; Quiz 5. |
| `editing-and-animation.html` | 3.3 | Textbook | 3.3.1 Kuleshov → 3.3.6 Discontinuity; Murch's Six Criteria (3.3.5). Kuleshov 1917/age-18 facts verified. |
| `animated-films.html` | 3.4 | Textbook | 3.4.1 History → 3.4.5 History of Special Effects; Quiz 6. **Afureko vs prescoring framing is corrected — do not regress** (anime = afureko/after-recording; Disney = prescoring; Akira broke convention by prescoring). Spirited Away Oscar claim verified. |
| `rhythm-of-process.html` | 3.5 | Assignment/journal | Anchor: *Jiro Dreams of Sushi*. Choose-from: Tokyo Drift, Initial D, Exit 8, Ramen Heads. ✅ canon. |

---

## 6. Guides (`guides/`, 18 worksheets — no chapter numbers, no canon obligations)

Pre-production & planning: `rewriting-scene-for-location`, `tailor-film-to-resources`, `tokyo-three-shot-worksheet`, `three-act-three-shot`, `three-shot-car-wash-example`, `fight-scene-structure-worksheet` (SET/RISE/TWIST/TIE), `action-units-worksheet`, `location-exploration-guide`.

Production: `shoot-day-checklist`, `motivated-camera-movement`, `local-business-commercial-guide` (Short Form Video), `local-commercial-shoot-edit-guide`, `practical-effects-guide`, `phone-filming-setup`.

Additional: `short-film-craft-guide` (12 principles), `short-film-process-worksheet` (6 sections).

---

## 7. Verified Fact Registry (checked against external sources, July 2026)

| Claim | Status |
|---|---|
| Chainsaw Man – The Movie: Reze Arc (2025) = IMDb `tt30472557`, dir. Tatsuya Yoshihara | ✅ fixed July 5, 2026 (was TV-series ID tt13616990) |
| Exit 8 (2025) = `tt35222590`, dir. Genki Kawamura, based on Kotake Create game | ✅ verified |
| Tokyo Ghoul canon = **2014 anime**, Shuhei Morita, `tt3741634` | ✅ owner decision July 5, 2026; all pages aligned |
| Howl's Moving Castle = `tt0347149` (2004, Miyazaki); Bullet Train = `tt12593682` (2022, Leitch) | ✅ verified |
| The Jazz Singer = first feature w/ synchronized dialogue | ✅ |
| Spirited Away (2001) = first anime Best Animated Feature Oscar | ✅ (teaching cite, allowed) |
| Kuleshov: first film 1917 (age ~18), co-founded one of world's first film schools | ✅ |
| Anime = afureko (voices after animation); Disney/Pixar = prescoring; Akira prescored | ✅ corrected April 2026, do not regress |
| Seven Samurai logline "recruits six samurai" (Kambei + 6 = 7) | ✅ |

---

## 8. Known Intentional Quirks (do NOT "fix")

- `index.html` and `textbook.html` intentionally duplicate the course-modules and film-list sections.
- Em dashes inside original Sharman prose stay (narrative.html has 34; production/guide.html 9; post/guide.html 14). Ban applies to NEW prose only.
- `.art-banner-wrap` divs with `&nbsp;` are intentional styled banners.
- Map labels in `index.html` JS use em dashes as UI separators ('Chainsaw Man — Tokyo Devil Hunter Map') — labels, not prose.
- `contact-form-embedded.html` is unlinked scaffold (has `YOUR_FORM_ID` placeholder + one mojibake char).
- Saiba45 font declared but never applied; h2 = Cinzel, locked.
- `guides/phone-filming-setup.html` is the only site page without the Moving Pictures attribution italic (checklist page; fine).

---

## 9. Cross-Reference

- Voice, canon list, numbering rules: `VOICE.md` (repo root) — read first, always.
- Routing / mode tree: `.devin/AGENT.md` (`.devin/` is the only agent-config directory; no `.windsurf/` exists).
- Craft theory: `.devin/NARRATIVE_REFERENCE.md`.
- Skill ↔ page mapping: `.devin/SKILLS_TO_TEXTBOOK_MAP.md`.
- Citation tags: `.devin/CITATION_PROTOCOL.md`; sources: `.devin/SOURCE_INDEX.md`.
