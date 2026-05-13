# Skills-to-Textbook Integration Map

**Purpose.** Connect the agent framework's 17 retrofitted craft skills (with verified inline citations) to the student-facing textbook/website pages where those concepts already live, should live, or could deepen what's there.

**Status.** Draft 1 — first full-system mapping. Numbers and chapter labels follow `VOICE.md` (`1.x` pre, `2.x` prod, `3.x` post).

**Reading order.**
1. Part 1 — Inventory (what we have on each side).
2. Part 2 — Skill → Page map (per-skill: where it lives, where it's missing).
3. Part 3 — Page → Skill map (per-chapter: which skills inform it).
4. Part 4 — Worksheet (`guides/`) → Skill map.
5. Part 5 — Integration phases (concrete sequenced actions).
6. Part 6 — Risks and non-goals.

**How to use.** When editing a page, look up the page in Part 3 to see which skills carry the canonical, citation-verified treatment of the concepts on that page. When evolving a skill, check Part 2 for which pages need to stay aligned.

---

## Part 1 — Inventory

### 1A. Agent framework skills (17 craft + 1 orchestrator)

Story / writing room (4):

- `narrative-structure` — Tomlinson 8-sequence, McKee crisis/climax, three-act
- `character-architecture` — archetype + wound + transformative action
- `dialogue-craft` — subtext, density test, voice consistency
- `write-short-film-scripts` — Burnett+Garland+UCA integrated short-form methodology

Visual / production craft (7):

- `visual-grammar` — shot sizes, cut-off rule, lead room, headroom, rule of thirds
- `optics-psychology` — focal length narrative meaning, DOF as narrative tool
- `lighting-architecture` — three-point system, key-to-fill ratios, motivated sources, color temperature
- `acoustic-design` — mic types, boom placement, room tone, L/J cuts at the audio layer
- `staging-blocking` — 180° line, coverage protocol, blocking marks
- `storyboard-artist` — script breakdown, six core shots, thumbnails, animatic
- `production-protocol` — crew hierarchy, set command chain, call sheets, safety

Post-production craft (4):

- `editorial-grammar` — Murch Six Criteria, continuity cuts, discontinuity, pacing
- `color-grading` — correction vs grading, LUTs, look design
- `audio-post-production` — EQ, compression, dialogue polish, foley, ADR, final mix
- `design-practical-effects` — household effects with safety-critical tagging

Meta (3):

- `ai-filmmaking-enhancement` — AI-assisted screenplay polish, mood boards, visual-first action lines
- `direct-digital-film` — integrative master skill (defers to specialists for citations)
- `film-producer-agent` — orchestrator (sequences calls to all specialists)

### 1B. Website pages (per `VOICE.md` chapter scheme)

**Pre-Production (1.x)** — `pre-production/`:

- `index.html` — phase landing
- `narrative.html` — 1.3 The Screenplay / Narrative Structure / Characters / Narration / Theme / Time / Genre
- `how-to-watch.html` — 1.2 viewing-as-a-filmmaker
- `mise-en-scene.html` — 1.4 design, costume, props, blocking-as-design
- `cinematography.html` — 1.5 pre-production cinematography (DP role, shot types, lenses-as-grammar)
- `catharsis.html` — 1.x assignment (catharsis journal)
- `pilgrimage-shots.html`, `shot-list.html`, `storyboard.html`, `script.html`, `animatic.html` — assignment scaffolds (mostly non-live per VOICE.md §6)
- `guide.html` — phase student guide

**Production (2.x)** — `production/`:

- `index.html` — phase landing
- `cinematography.html` — 2.x on-set cinematography (camera angles, lenses, DOF, movement, acting, production challenges)
- `mise-en-scene.html` — 2.x mise-en-scène on set
- `sound-design.html` — 2.x production sound (mics, boom, room tone)
- `visual-foreshadowing.html` — 2.5 assignment (Seed → Growth → Bloom)
- `guide.html` — phase student guide

**Post-Production (3.x)** — `post-production/`:

- `index.html` — phase landing
- `editing-and-animation.html` — 3.3 Kuleshov / Eisenstein / Editing Space-Time / Continuity / Discontinuity
- `sound-design.html` — 3.x post sound (ADR, foley, mixing)
- `animated-films.html` — 3.x animation production (afureko / prescoring framing per existing memory)
- `rhythm-of-process.html` — 3.x assignment
- `guide.html` — phase student guide

**Worksheets (`guides/`)** — 17 student-facing exercise sheets (see Part 4).

**Cross-cutting:** `index.html`, `textbook.html`, `glossary.html`, `free-guides.html`, `scene-project.html`.

---

## Part 2 — Skill → Page Map

For each skill: **Primary** = the page whose existing chapter this skill is the canonical citation-verified treatment of. **Secondary** = pages where the skill's concepts surface in passing and should stay aligned. **Gap** = a concept the skill covers that the textbook does not yet teach (an integration opportunity, not a defect of the textbook). **Citation status** = whether the page already cites the same locators the skill anchors on.

### 2.1 Story / Writing-Room Skills

#### `narrative-structure`

- **Primary:** `pre-production/narrative.html` §§1.3.2 Narrative Structure, 1.3.6 Time
- **Secondary:** `pre-production/how-to-watch.html` (sequence-spotting); `production/visual-foreshadowing.html` (the Seed→Growth→Bloom assignment is a structural foreshadowing claim grounded in this skill); `pre-production/script.html` (assignment scaffold)
- **Gap on site:** Tomlinson 8-sequence framework is in the skill (`Tomlinson:PlotBasics text00007`) but the textbook teaches Field's 4-act-paradigm beats. Tomlinson is more useful for the short-film assignment cycle. Add a "Two structural lenses" sidebar.
- **Citation status:** Skill cites `Tomlinson:PlotBasics`, `McKee:Story`. Page currently cites Field by name only with no locator. **Action:** add locator anchors when next editing the page; do not rewrite voice.

#### `character-architecture`

- **Primary:** `pre-production/narrative.html` §1.3.3 Compelling Characters
- **Secondary:** `pre-production/script.html`; `production/visual-foreshadowing.html` (character-level seeds); guides/`short-film-craft-guide.html`
- **Gap on site:** The skill's archetype + wound + breaking-point + transformative-action template is more granular than the page's protagonist/anti-hero/goal framing. The page does the survey; the skill does the construction. Add a "Build a character" sidebar that links to the skill's template via a guide page rather than burying it in the chapter.
- **Citation status:** Skill cites `Tomlinson:PlotBasics text00005`, `McKee:Story`. Page does not yet cite at the locator level. **Action:** keep the page's voice; add locator anchors only where a specific claim warrants.

#### `dialogue-craft`

- **Primary:** `pre-production/narrative.html` §1.3.1 The Screenplay (subsection on dialogue if present); `pre-production/script.html` (assignment scaffold)
- **Secondary:** guides/`short-film-craft-guide.html`; guides/`rewriting-scene-for-location.html`
- **Gap on site:** The Dialogue Density Test, Subtext-First Translation table, and "voice consistency tracker" from the skill are nowhere on the site. These are concrete writing tools — strong candidates for a `guides/dialogue-density-worksheet.html`.
- **Citation status:** Skill is fully retrofitted. Page treatment is light. **Action:** new worksheet rather than a textbook rewrite.

#### `write-short-film-scripts`

- **Primary:** Cross-cuts the entire `pre-production/` phase. Closest existing page: `guides/short-film-craft-guide.html` and `guides/short-film-process-worksheet.html`
- **Secondary:** `pre-production/guide.html`; `pre-production/script.html`
- **Gap on site:** The skill's 14-day workflow, length-tier table (3–30 min), and 5-Lock pre-writing decision lock are not represented on the site as a single integrated path. The current short-film guides are partial.
- **Citation status:** Skill correctly tags Burnett/Garland/UCA as `[external-source]` (resolved this session). The site does not need to inherit those external labels; it should cite the underlying corpus (`McKee`, `Tomlinson`, `Trottier`) at the same locators the skill uses. **Action:** consider one consolidated short-film methodology guide (`guides/short-film-methodology.html`) that mirrors the skill's structure.

### 2.2 Visual / Production-Craft Skills

#### `visual-grammar`

- **Primary:** `pre-production/cinematography.html` (shot types section); `production/cinematography.html` §Composition
- **Secondary:** `pre-production/storyboard.html`; `pre-production/shot-list.html`; guides/`tokyo-three-shot-worksheet.html`
- **Gap on site:** The cut-off rule (no joint cuts) and explicit lead-room ratios (60/40, 70/30) are in the skill but not on the page. Headroom percentage (10%) is not specified. These are quick additions.
- **Citation status:** Skill cites `DigitalFilmmaking p.134`, `FilmCheckingContent p.59-67`. Page already harmonizes with `FilmCheckingContent` (it's the textbook source). **Action:** when next editing the page, add the cut-off rule and explicit ratios as a callout.

#### `optics-psychology`

- **Primary:** `production/cinematography.html` §§Lenses and Perspective, Depth of Field and Focus
- **Secondary:** `pre-production/cinematography.html` (lens overview); `production/visual-foreshadowing.html`
- **Gap on site:** The skill's mapping of focal length to *psychological reads* (wide = vulnerability/exposure; telephoto = surveillance/paranoia) is sharper than the page's neutral technical framing. This is voice-compatible content.
- **Citation status:** Skill cites `Filmmaking:MakingAFilm p.199, p.206`, `FilmCheckingContent p.58-63`. Page cites Sharman implicitly (the page IS Sharman-derived). **Action:** add a "what this means narratively" paragraph to each focal-length subsection.

#### `lighting-architecture`

- **Primary:** `pre-production/cinematography.html` (three-point lighting subsection); `production/cinematography.html` (if lighting appears there)
- **Secondary:** guides/`phone-filming-setup.html` (key-to-fill ratio approximation with phone lights); guides/`shoot-day-checklist.html`
- **Gap on site:** The skill anchors three-point numerics to `DigitalFilmmaking p.73` (300fc key, 150fc fill, 2:1 ratio) — verbatim. The site teaches three-point qualitatively. The 2:1 / 4:1 / 8:1 emotional-dial table is a strong candidate for a sidebar.
- **Citation status:** Skill: verified `[DigitalFilmmaking p.73]`. Page: derived from Sharman. The two sources agree but use different framings. **Action:** sidebar pattern, not rewrite.

#### `acoustic-design`

- **Primary:** `production/sound-design.html`
- **Secondary:** `post-production/sound-design.html` (continuity into post)
- **Gap on site:** Room tone protocol (60-second hold, "Hold for room tone!" verbatim from `FilmCheckingContent p.92-93`) is essential and may already be on the production page — needs verification. The skill's mic polar-pattern table (shotgun/lavalier/PZM) is technical but valuable for the 2.x level.
- **Citation status:** Skill: `FilmCheckingContent p.92-93`, `DigitalFilmmaking p.99`. Page: derived from Sharman (= FilmCheckingContent). They should match. **Action:** verify room-tone callout on `production/sound-design.html`; add if missing.

#### `staging-blocking`

- **Primary:** `production/cinematography.html` (180° rule lives here implicitly via screen direction); `post-production/editing-and-animation.html` §3.3.4 Continuity Editing (the 180° line is taught explicitly here)
- **Secondary:** `pre-production/storyboard.html`; guides/`tokyo-three-shot-worksheet.html`
- **Gap on site:** The site teaches the 180° rule once (in editing). The skill teaches it twice — first as production-side blocking, then again as the editorial reason it matters. Cross-link the two treatments.
- **Citation status:** Skill: `Frierson:EditingTheory p.76-77`, `Filmmaking:MakingAFilm p.108`. Page (editing) currently introduces the rule without locator. **Action:** add cross-page anchor link from production cinematography → post editing where the rule is explained.

#### `storyboard-artist`

- **Primary:** `pre-production/storyboard.html`; `pre-production/animatic.html`
- **Secondary:** `pre-production/shot-list.html`
- **Gap on site:** Both pages are non-live per `VOICE.md §6` (assignment scaffolds). The skill's six-core-shots framework, thumbnail process, and animatic workflow are stronger than what's on the scaffolds.
- **Citation status:** Skill is fully retrofitted. Pages are scaffolds. **Action:** when these pages are promoted to live, port the skill's framework wholesale (with voice adaptation).

#### `production-protocol`

- **Primary:** `production/cinematography.html` §§The Challenges of Production, A Collaborative Medium
- **Secondary:** guides/`shoot-day-checklist.html`; guides/`local-business-commercial-guide.html`; `production/guide.html`
- **Gap on site:** Crew hierarchy table (DP / 1st AC / Gaffer / Key Grip / Boom Op / Sound Mixer / Script Supervisor) is in the skill but the site's "Collaborative Medium" section talks about it loosely without the org chart. A tight crew-roles sidebar would help.
- **Citation status:** Skill: `DigitalFilmmaking p.88`, `Filmmaking:MakingAFilm p.130`. **Action:** crew-roles sidebar on `production/cinematography.html` or `production/guide.html` (probably the guide is the right home).

### 2.3 Post-Production-Craft Skills

#### `editorial-grammar`

- **Primary:** `post-production/editing-and-animation.html` §§3.3.1–3.3.5 (the entire chapter)
- **Secondary:** `production/cinematography.html` (cuts-implied-by-coverage); `post-production/rhythm-of-process.html`
- **Gap on site:** Murch's Six Criteria of a Good Cut (Emotion, Story, Rhythm, Eye-trace, Two-dimensional plane, Three-dimensional space) is the skill's spine but does not appear on the page. This is genuinely additive content.
- **Citation status:** Skill: `Frierson:EditingTheory p.112-113`. Page: cites Eisenstein, Kuleshov, but not Murch. **Action:** new subsection §3.3.x "Murch's Six Criteria" written in Sharman voice — strong addition.

#### `color-grading`

- **Primary:** Currently no dedicated page. Concept is touched in `post-production/editing-and-animation.html` (briefly).
- **Secondary:** `post-production/guide.html` (workflow context)
- **Gap on site:** Color correction vs grading distinction, LUT mechanics, look design. This is a clean candidate for a new chapter section §3.x or a worksheet (`guides/color-grading-decisions.html`).
- **Citation status:** Skill: `JCam:InstructorGuide p.20`, `Filmmaking:MakingAFilm p.202, p.302`, `Frierson:EditingTheory p.280`. **Action:** new content, not retrofit. Decide whether it's textbook chapter or guide page first.

#### `audio-post-production`

- **Primary:** `post-production/sound-design.html`
- **Secondary:** `production/sound-design.html` (continuity from production sound)
- **Gap on site:** EQ, compression, foley, ADR workflow — partial coverage exists. The skill's anchor on `FilmCheckingContent p.93-94` (Sharman on dialogue polish) means the page already shares the source; verify alignment.
- **Citation status:** Skill: `Filmmaking:MakingAFilm p.294, p.308-309`, `DigitalFilmmaking p.110`, `FilmCheckingContent p.93-94`. **Action:** verify locator alignment when next editing the page.

#### `design-practical-effects`

- **Primary:** `guides/practical-effects-guide.html`
- **Secondary:** `production/visual-foreshadowing.html` (effects as visual seeds)
- **Gap on site:** The skill's safety-critical tagging (fire, chemical, glass, electricity) is more rigorous than what's on the guide. Particularly important for the May 2026 student trip.
- **Citation status:** Skill is mostly `[general-knowledge]` + `[safety-critical]` tags. Guide is mostly recipe-style. **Action:** add a safety preamble to the guide using the skill's `[safety-critical]` items as the source of truth.

### 2.4 Meta Skills

#### `ai-filmmaking-enhancement`

- **Primary:** Not a textbook chapter. Lives in instructor-facing process docs (e.g., `AGENT.md`).
- **Secondary:** Could inform `guides/short-film-craft-guide.html` if AI-assisted writing is taught to students.
- **Gap on site:** Intentional. AI tooling is not in the textbook scope. Decision: keep it agent-only unless the course adopts it.
- **Citation status:** Skill explicitly exempts AI tooling claims from citation protocol.
- **Action:** no integration unless directed.

#### `direct-digital-film`

- **Primary:** Cross-cuts every chapter. The "neural network" framing is agent-internal.
- **Secondary:** All textbook chapters indirectly.
- **Gap on site:** Intentional. This skill is the integrative master; the textbook delivers the same material domain-by-domain in Sharman's voice.
- **Citation status:** Skill is partially resolved (specialist-skill cross-reference map). **Action:** no direct integration. The textbook IS the student-facing version of this content.

#### `film-producer-agent`

- **Primary:** Orchestrator only. No textbook home.
- **Action:** no integration. Internal protocol.

---

## Part 3 — Page → Skill Map

The reverse direction. When you open a page, this is the list of skills whose citation-verified treatment should harmonize with what's on the page.

### Pre-Production

| Page | Primary skills | Secondary skills | Notes |
|---|---|---|---|
| `narrative.html` | `narrative-structure`, `character-architecture`, `dialogue-craft` | `write-short-film-scripts` | The single largest concentration of writing-room skills. |
| `how-to-watch.html` | `narrative-structure`, `editorial-grammar` | `visual-grammar`, `optics-psychology` | Teaches viewing-as-a-filmmaker; touches every domain shallowly. |
| `mise-en-scene.html` | `staging-blocking`, `lighting-architecture` | `visual-grammar`, `production-protocol` | Mise-en-scène is where staging and design overlap. |
| `cinematography.html` (pre) | `visual-grammar`, `optics-psychology`, `lighting-architecture` | `storyboard-artist`, `production-protocol` | DP role + shot-type vocabulary. |
| `catharsis.html` | `narrative-structure`, `character-architecture` | — | Assignment journal. |
| `script.html` | `dialogue-craft`, `character-architecture`, `write-short-film-scripts` | `narrative-structure` | Script assignment scaffold. |
| `storyboard.html` | `storyboard-artist`, `visual-grammar` | `staging-blocking`, `optics-psychology` | Non-live scaffold per VOICE.md §6. |
| `shot-list.html` | `visual-grammar`, `storyboard-artist` | `optics-psychology` | Non-live scaffold. |
| `animatic.html` | `storyboard-artist`, `editorial-grammar` | — | Non-live scaffold. |
| `pilgrimage-shots.html` | `visual-grammar`, `staging-blocking` | — | Non-live scaffold; Tokyo-location-specific. |
| `pre-production/guide.html` | `write-short-film-scripts` | `production-protocol` | Phase student guide. |

### Production

| Page | Primary skills | Secondary skills | Notes |
|---|---|---|---|
| `cinematography.html` (prod) | `optics-psychology`, `staging-blocking`, `production-protocol` | `visual-grammar`, `lighting-architecture` | Largest single page; on-set craft. |
| `mise-en-scene.html` | `staging-blocking`, `lighting-architecture` | `production-protocol` | Mise-en-scène on set. |
| `sound-design.html` (prod) | `acoustic-design` | `production-protocol` | Mics, boom, room tone, set discipline. |
| `visual-foreshadowing.html` | `narrative-structure`, `character-architecture` | `optics-psychology`, `editorial-grammar` | Seed→Growth→Bloom assignment. |
| `production/guide.html` | `production-protocol` | All visual/sound craft skills | Phase student guide. |

### Post-Production

| Page | Primary skills | Secondary skills | Notes |
|---|---|---|---|
| `editing-and-animation.html` | `editorial-grammar`, `staging-blocking` | `visual-grammar` | The 180° rule lives here despite being a production-side decision. |
| `sound-design.html` (post) | `audio-post-production` | `acoustic-design` | EQ, foley, ADR, mix. |
| `animated-films.html` | `editorial-grammar`, `audio-post-production` | — | Afureko / prescoring framing already corrected per memory. |
| `rhythm-of-process.html` | `editorial-grammar` | — | Pacing assignment. |
| `post-production/guide.html` | `editorial-grammar`, `audio-post-production`, `color-grading` | — | Phase student guide. |

---

## Part 4 — Worksheet (`guides/`) → Skill Map

The 17 student-facing worksheets are where skill-level craft is operationalized into a doable exercise. Several skills are over-served by guides; a few are under-served.

| Worksheet | Operationalizes | Notes |
|---|---|---|
| `action-units-worksheet.html` | `staging-blocking`, `narrative-structure` | Action choreography breakdown. |
| `fight-scene-structure-worksheet.html` | `narrative-structure`, `staging-blocking` | Fight-as-three-act-scene. |
| `local-business-commercial-guide.html` | `production-protocol`, `write-short-film-scripts` | Real-client commercial workflow. |
| `local-commercial-shoot-edit-guide.html` | `production-protocol`, `editorial-grammar` | Shoot+edit pipeline. |
| `location-exploration-guide.html` | `staging-blocking`, `production-protocol` | Tokyo location scouting. |
| `motivated-camera-movement.html` | `optics-psychology`, `staging-blocking` | Movement as narrative tool. |
| `phone-filming-setup.html` | `lighting-architecture`, `acoustic-design`, `production-protocol` | Phone-as-camera constraints. Strong target for the lighting 2:1/4:1/8:1 sidebar. |
| `practical-effects-guide.html` | `design-practical-effects` | Direct skill→guide port. **Add safety-critical preamble.** |
| `rewriting-scene-for-location.html` | `dialogue-craft`, `write-short-film-scripts` | Constraint-first writing exercise. |
| `shoot-day-checklist.html` | `production-protocol`, `acoustic-design`, `lighting-architecture` | The skill's call-sheet/safety items belong here. |
| `short-film-craft-guide.html` | `write-short-film-scripts`, `narrative-structure`, `character-architecture` | Most direct match for `write-short-film-scripts`. |
| `short-film-process-worksheet.html` | `write-short-film-scripts` | Process-side companion to the craft guide. |
| `tailor-film-to-resources.html` | `production-protocol`, `write-short-film-scripts` | Constraint-first concept formula. |
| `three-act-three-shot.html` | `narrative-structure`, `visual-grammar`, `staging-blocking` | Shot-list-as-act-structure. |
| `three-shot-car-wash-example.html` | `narrative-structure`, `visual-grammar` | Worked example of three-act-three-shot. |
| `tokyo-three-shot-worksheet.html` | `narrative-structure`, `visual-grammar`, `staging-blocking` | Tokyo-location-applied version. |

**Under-served by guides:**

- `dialogue-craft` — only operationalized indirectly via `rewriting-scene-for-location`. **Candidate:** `guides/dialogue-density-worksheet.html`.
- `editorial-grammar` — no dedicated guide despite Murch Six Criteria being learnable. **Candidate:** `guides/six-criteria-cut-decisions.html`.
- `color-grading` — no chapter, no guide. **Candidate:** `guides/color-grading-decisions.html`.
- `storyboard-artist` — has assignment scaffolds but no concrete worksheet. **Candidate:** `guides/storyboard-thumbnail-process.html`.

---

## Part 5 — Integration Phases

Sequenced from lowest-risk to highest-effort. Each phase is independently shippable; do not start a later phase before the prior one is complete unless explicitly de-prioritized.

### Phase 1 — Citation alignment audit (low risk, high value)

For each `[Primary]` skill→page pairing in Part 2, open the page and confirm:

1. The page does not contradict any verified locator-anchored claim in the skill.
2. Where the page already cites the same source the skill anchors on, the framing is consistent (e.g., `300fc / 2:1` ratio numerics from `DigitalFilmmaking p.73` should not be flatly contradicted in prose).
3. The 2026 film canon (`VOICE.md §3`) is respected in any film examples.

**Output:** a one-paragraph "alignment note" per page, appended to the page → skill table in Part 3, with a `[verified]` / `[needs-fix]` / `[needs-content]` flag.

**Effort:** ~30 minutes per page × ~12 textbook pages = one focused session.

**Deliverable:** revised Part 3 with status flags. No content changes to the website yet.

### Phase 2 — Sidebar cross-references (low risk, medium value)

For each gap identified in Part 2 that fits as a sidebar / callout (not a chapter rewrite), add a "Want to go deeper?" sidebar in the page that points to the equivalent skill domain via a plainer-language student-facing description (not the skill name itself — students don't see skills).

**Concrete sidebar candidates:**

- `pre-production/cinematography.html` — Cut-off rule + lead-room ratios callout (`visual-grammar` gap).
- ✅ `pre-production/cinematography.html` — Three-point lighting emotional-dial table 2:1 / 4:1 / 8:1 (`lighting-architecture` gap). **Shipped** May 2026 (commit after `002e5ff`). Anchored to `[DigitalFilmmaking p.73]`. Pairings: `Jiro Dreams of Sushi` (2:1), `Exit 8` (8:1).
- `production/cinematography.html` — Crew hierarchy org chart (`production-protocol` gap).
- `production/cinematography.html` — Focal-length-as-psychology paragraph (`optics-psychology` gap).
- `production/sound-design.html` — Verify room-tone protocol callout exists (`acoustic-design`).
- ✅ `post-production/editing-and-animation.html` — Murch's Six Criteria as new §3.3.5; existing Discontinuity renumbered to §3.3.6 (`editorial-grammar` gap, the largest single addition). **Shipped** May 2026. Anchored to `[Frierson:EditingTheory p.112-113]`. Percentage-weighting myth flagged in prose, not propagated.

**Effort:** one sidebar per session, written in Sharman voice (per `VOICE.md §1`). Six sidebars ≈ six sessions.

**Voice discipline:** every sidebar gets a Sharman-pass — second person, parenthetical aside, named film if possible. No em-dashes in new prose (`VOICE.md §2`).

### Phase 3 — Worksheet creation (medium effort, medium value)

Build the four under-served worksheets identified in Part 4:

1. `guides/dialogue-density-worksheet.html` — operationalizes `dialogue-craft`'s Subtext-First table and Density Test.
2. `guides/six-criteria-cut-decisions.html` — operationalizes `editorial-grammar`'s Murch criteria into a per-cut decision sheet.
3. `guides/color-grading-decisions.html` — operationalizes `color-grading`'s correction-vs-grading distinction with a 5-decision exercise.
4. `guides/storyboard-thumbnail-process.html` — operationalizes `storyboard-artist`'s thumbnail-to-animatic flow.

**Use:** the existing `/create-new-worksheet` workflow. Each worksheet should explicitly link to the skill's source corpus locators (so the worksheet is auditable against the same evidence chain as the skill).

**Effort:** ~1 worksheet per session, four sessions.

### Phase 4 — Net-new chapter content (high effort, high value)

These additions are not retrofits — they are new sections in Sharman voice:

1. **Murch's Six Criteria** — new subsection in `post-production/editing-and-animation.html` (between current §3.3.4 and §3.3.5). Largest single content addition.
2. **Color grading** — decide chapter-vs-guide. If chapter: new file `post-production/color-grading.html` numbered §3.x. If guide: covered by Phase 3.
3. **Tomlinson 8-sequence sidebar** — added to `pre-production/narrative.html` §1.3.2 as a "Two structural lenses" callout (Field paradigm vs Tomlinson sequences).

**Effort:** each new chapter section = 1–2 sessions of writing + Sharman-voice pass + film-pairing verification.

### Phase 5 — Promotion of non-live scaffolds (deferred, scope decision required)

The storyboard / shot-list / animatic / pilgrimage-shots / script assignment pages are non-live (`VOICE.md §6`). The skills (`storyboard-artist`, `visual-grammar`, etc.) have stronger content than these scaffolds.

**Decision needed:** do these stay non-live (scaffolds for instructor use only) or do they go live as student-facing pages? Phase 5 only triggers if the answer is "go live."

If they go live: port the skill content with voice adaptation. This is a 4–5 page rewrite.

---

## Part 6 — Risks and Non-Goals

### Risks

- **Voice contamination.** Skill prose is technical, dense, list-heavy. Textbook prose is conversational, parenthetical, second-person. Never paste skill content verbatim into a textbook page without a Sharman-voice rewrite. `VOICE.md §10` is the checklist.
- **External-source labels leaking student-side.** The Burnett/Garland/UCA `[external-source]` tags are agent-internal epistemic flags. Students should not see them. Cite the underlying corpus (`McKee`, `Trottier`, `Tomlinson`) when adapting skill content for the site.
- **Citation creep into prose.** The skill's `[Source p.N]` syntax is for the agent's auditing layer. Student-facing pages should phrase sources as Sharman does (named in prose, not bracketed). Footnotes at most.
- **Film canon drift.** Any new prose must use only the 2026 canon (`VOICE.md §3`). Skills sometimes use pre-2026 examples (e.g., `Spirited Away` is still live in the skills despite the pending swap to `Howl's Moving Castle`). Re-pair before pasting.
- **Em-dash drift.** Many skills use em-dashes liberally. New site prose must not (`VOICE.md §2`). Rewrite punctuation when porting.

### Non-Goals

- **Do not rewrite Sharman.** Existing chapter prose stays. Add sidebars and new sections; do not edit or "improve" text already in Sharman's voice.
- **Do not propagate `[agent-synthesis]` claims.** If a skill claim is tagged `[agent-synthesis]` (i.e., the agent invented the framing), it is not appropriate for the textbook unless the user explicitly endorses it.
- **Do not expand beyond the 17 craft skills.** Operational skills (`format-screenplay-docx`, `manage-google-forms`, `update-css-version`, `deploy-site`, etc.) are agent infrastructure — they have no textbook home and no integration target.
- **Do not flatten the skills into the textbook.** The skills are denser than students need. The textbook is the curated, voice-adapted, age-appropriate slice. The skills remain the agent's full reference.

---

## Quick-Reference Checklist (for any page edit)

1. Open this map. Find the page in Part 3.
2. Read the listed skills' `## Sources` blocks for the canonical locators.
3. Confirm any new claim on the page either: (a) cites a corpus locator already in the skill, or (b) is general knowledge that does not need a locator.
4. Apply `VOICE.md` voice + canon checks before saving.
5. If a claim is novel (not in skill, not in existing page), flag it for review rather than ship it.
