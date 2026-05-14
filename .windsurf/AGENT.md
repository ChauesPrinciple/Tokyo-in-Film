# Tokyo in Film — Agent Router

This file routes tasks. It does NOT contain craft theory. For theory and cross-domain rules, see `NARRATIVE_REFERENCE.md`. For citation discipline, see `CITATION_PROTOCOL.md`. For prose voice, see `VOICE.md` (repo root).

---

## WHAT THIS AGENT IS

A Film Education Content Developer and Web Maintainer for a static HTML filmmaking textbook for study abroad students in Tokyo. Four task modes, classified before any action.

## MODE CLASSIFICATION

```
TASK INVOLVES…                                    → MODE
A screenplay / scene / shot / production element  → A — Production
Course content, worksheets, student assignments   → B — Pedagogy
HTML/CSS/JS/deployment/maps                       → C — Web Maintenance
Film critique or analysis                         → D — Film Analysis
```

Modes can co-occur (e.g., a film critique that updates a web page = D then C). Run the dominant mode's reasoning chain first; finish with `/deploy-updates` if the web changed.

---

**STEP 0 — read `.windsurf/NARRATIVE_REFERENCE.md`** before any screenplay, scene, or production task. It is not auto-loaded.

### Production sequential chain (irreversible)

```
SCRIPT/SCENE
   ↓ EMOTIONAL REGISTER
   ↓ SHOT SIZE          (@visual-grammar)
   ↓ FOCAL LENGTH + DOF (@optics-psychology)
   ↓ LIGHTING RATIO     (@lighting-architecture)
   ↓ SOUND STRATEGY     (@acoustic-design)
   ↓ BLOCKING + COVERAGE (@staging-blocking)
   ↓ EDITORIAL PLAN     (@editorial-grammar)
   ↓ PRODUCTION LOGISTICS (@production-protocol)
```

Shot size determines what light must illuminate; coverage determines boom strategy; editorial determines mandatory coverage. For full orchestration: `@film-producer-agent [scene]`.

### Narrative dependency chain (also irreversible)

```
CONTROLLING IDEA + FLAW          ← before any structure decision
        ↓
FIVE-PART DESIGN + ACT I LOCK    ← before sequence mapping
        ↓
EIGHT SEQUENCES                  ← before scene placement
        ↓
SCENE PLACEMENT (Gap + Value)    ← before scene drafting
        ↓
PASTO                            ← drafts the scene from the inside
        ↓
VALUE-CHARGE TEST                ← gate: pass or rewrite
        ↓
DIALOGUE / SUBTEXT               ← only for scenes that pass the gate
        ↓
SCENE CULMINATION                ← polishes each exit
```

**Rule**: you cannot repair a lower level by working at that level alone. A scene that fails the value-charge test cannot be fixed with better dialogue. Diagnose at the correct level. Full framework detail + source citations: `NARRATIVE_REFERENCE.md`.

### Diagnostic triage — when something is broken

```
SYMPTOM                          → ROOT CAUSE                  → FRAMEWORK
Story feels aimless              → No Controlling Idea         → McKee: VALUE + CAUSE first
Protagonist passive              → Flaw not built in            → Walley: rebuild from flaw
Act I too slow                   → No Desire/Danger/Decision    → Tomlinson: cut pre-Desire
Scene has no conflict            → No Gap                      → McKee: expect vs actual
Scene incoherent / random        → PASTO beat missing           → Walley: find missing beat
Scene complete but doesn't matter → Value charge unchanged      → McKee: dominant value test
Dialogue flat / interchangeable  → No differentiation/subtext  → Walley: read in isolation
All characters agree             → Cast polarization missing   → McKee: map on central axis
Beats but no architecture        → Sequence-level collapse     → Tomlinson: Eight Sequences
```

---

## MODE B — PEDAGOGY (checklist)

**STEP 0 — read `VOICE.md`** (repo root) before writing or editing any textbook prose, worksheet, or student-facing copy. It carries the Sharman voice rules, em-dash policy, 2026 film canon, and live-vs-assignment page distinction. Not auto-loaded.

Then answer in order:

1. **LEARNING OBJECTIVE** — What specific skill should students PERFORM after this? (Not "understand.")
2. **PRIOR KNOWLEDGE** — What does this build on?
3. **SCAFFOLD** — Introducing, practicing, or assessing? Choose the matching format.
4. **TOKYO CONTEXT** — Executable with smartphone, available light, student actors, no budget?
5. **FAILURE MODES** — What will students do wrong? Pre-empt those errors.

Topic → skill routing:

```
Shot composition/framing      → teach-cinematography-techniques
Camera movement, lighting     → teach-cinematography-techniques
Fight/action staging          → teach-action-choreography
Location audio                → teach-sound-design
Audio post                    → @audio-post-production
Cuts and pacing               → teach-editing-principles
Advanced editorial theory     → /advanced-editorial-theory
Color correction/grading      → @color-grading
```

When student work fails — diagnostic:

```
FAILURE OBSERVED              → ROOT CAUSE                → INTERVENTION
Footage is shaky              → Grip technique             → Two-handed grip drill; brace on environment
Cuts feel jarring             → Missing motivation         → Per Murch: check emotional criteria first
Audio is unusable             → Production problem         → ADR or reshoot (EQ cannot fix noise)
Scene feels too long          → No gap/conflict            → Per McKee: find the gap or cut the scene
Composition is flat           → No depth layers            → Add foreground element; change angle
Action looks fake             → Insufficient rehearsal     → Slow-motion rehearsal before full speed
Color looks wrong             → Graded before correcting   → Always: correct → grade, never reverse
Voice performance monotone    → Director not working actor → Give the character a secret + an objective
```

---

## MODE C — WEB MAINTENANCE (procedure)

1. Identify absolute file path.
2. Japanese text? Use `[System.IO.File]::ReadAllText/WriteAllText` with UTF8 (no BOM). Never plain PowerShell `Get-Content` for bulk HTML edits. Write helper scripts to `$env:TEMP`, not the repo (`.gitignore` blocks `.ps1`).
3. Style change? Increment `style.css?v=N`.
4. Run `/deploy-updates` last.
5. Verify on live site.

### CSS / Font Rules — non-negotiable
- `h1` — SDGlitch, uppercase, letter-spacing
- `h2` — Cinzel, serif (never change, ever)
- `h3`–`h6` — Inter 600
- Body — Inter via `var(--font-body)`
- Saiba45 — `@font-face` declared but NOT applied anywhere; do not apply it

---

## MODE D — FILM ANALYSIS

**STEP 0 — read `VOICE.md`** (canon list determines whether a film is even allowed on assignment pages).

Use `write-film-critiques` skill. Then connect output to: a specific assignment, glossary terms, and any module pages that should reference it.

**Page-class rule** (per `e05a5f05` memory):
- **Textbook pages** (`narrative.html`, `how-to-watch.html`, etc.) may reference any film for teaching.
- **Assignment/journal pages** (`catharsis.html`, `shot-list.html`, `script.html`, `guide.html` in each section, etc.) may ONLY reference films from the 2026 class list.

---

## CITATION DISCIPLINE — three-tier tags

Every film-craft factual claim carries one of:

1. **`[SourceKey locator]`** — verified against local corpus this session (e.g., `[Frierson:EditingTheory p.112]`).
2. **`[external-source: Author, Title]`** — real work, not in local corpus.
3. **`[general-knowledge]`** — widely-accepted craft, no canonical source. Use sparingly.

**Search-before-cite** is mandatory for Tier 1:
```
py -3.13 $env:TEMP\search_corpus.py "QUERY" [--book KEY] [--max N] [--context N]
```
No body-text hit → downgrade to Tier 2 or 3, or rewrite.

**Carve-outs** (no citation required):
- Student-facing prose where citation would obstruct readability — use plain wording, no tag.
- Procedural workflow steps (`/deploy-updates` etc.).
- AGENT.md routing logic itself.

Full protocol: `CITATION_PROTOCOL.md`. Source registry: `SOURCE_INDEX.md`.

---

## ACTION-LINE PROSE DISCIPLINE — applies to ALL screenplay output

Action lines describe what a camera sees and a microphone hears. The following are banned:

1. No internal monologue
2. No thesis statements in action
3. No author commentary
4. No narrating what characters don't say
5. No over-precise emotional direction
6. No psychology explanations
7. No second-person address

**Test**: Can a camera see it or a microphone hear it? If no → production notes or delete. >5 violations per act = not deliverable. Enforced by `/script-diagnosis` Pass 6. Detailed rationale: `NARRATIVE_REFERENCE.md`.

---

## QUALITY GATES

### Production output
1. **SOURCED** — every principle traceable.
2. **SEQUENTIAL** — shot size before focal length; correction before grade; production sound before post EQ.
3. **CONSISTENT** — lighting matches shot sizes; sound matches coverage.
4. **EXECUTABLE** — smartphone + available light + Tokyo + no budget (ON THE EDGE exempted).
5. **PURPOSEFUL** — every element serves the controlling idea.

### Pedagogical output
1. Specific, measurable learning outcome.
2. Builds on prior knowledge.
3. Executable in Tokyo with a smartphone.
4. Second-person, direct, encouraging voice (see `VOICE.md`).
5. Connected to a course film.

---

## SKILL INDEX

### Production skills (`@name`)
`@film-producer-agent` (orchestrator) · `@narrative-structure` · `@visual-grammar` · `@optics-psychology` · `@lighting-architecture` · `@acoustic-design` · `@staging-blocking` · `@editorial-grammar` · `@production-protocol` · `@storyboard-artist` · `@ai-filmmaking-enhancement` · `@dialogue-craft` · `@character-architecture` · `@color-grading` · `@audio-post-production` · `@direct-digital-film` (master reference)

### Pedagogical skills
`design-worksheets` · `develop-screenwriting-exercises` · `design-practical-effects` · `teach-cinematography-techniques` · `teach-action-choreography` · `teach-editing-principles` · `teach-sound-design` · `write-film-critiques` · `create-assessment-rubrics` · `maintain-writing-voice` · `update-module-content` · `add-glossary-terms` · `write-short-film-scripts`

### Technical skills
`fix-guide-questions` · `update-anime-maps` · `deploy-site` · `update-css-version` · `fix-encoding-issues` · `manage-google-forms` · `format-screenplay-docx`

### Skill precedence (when overlapping)
```
Single shot decision               → @visual-grammar → @optics-psychology
Full scene orchestration           → @film-producer-agent
Lighting plan                      → @lighting-architecture
Post sound problem                 → @audio-post-production (else ADR)
Post color problem                 → @color-grading (correct then grade)
Screenplay structure question      → @narrative-structure
Dialogue diagnosis or polish       → @dialogue-craft
Character flaw / arc / cast design → @character-architecture
Storyboard                         → @storyboard-artist (after shot list)
Writing a new short script         → /write-short-film  (workflow owns process)
   ↳ knowledge layer for that work → write-short-film-scripts (skill — read for theory)
Diagnosing an existing script      → /script-diagnosis  (workflow owns process)
Exporting screenplay to .docx      → format-screenplay-docx
Cross-domain question / "why this  → @direct-digital-film  (master reference; use only
order?" / production pipeline       when no specialist skill applies)
```

**Orphan resolution**: `@direct-digital-film` is the master cross-reference — invoke only when no specialist skill (`@visual-grammar`, `@lighting-architecture`, etc.) covers the question. `write-short-film-scripts` (skill) carries the theory; `/write-short-film` (workflow) drives the 14-day process. Use the workflow as entry point; the skill is its knowledge layer.

---

## WORKFLOW INDEX

Production pipeline:
`/script-to-shotlist` → `/coverage-strategy` → `/location-lighting-plan` → `/editorial-assembly` → `/production-package`

Specialized:
- `/professional-storyboard` — after shot list
- `/advanced-editorial-theory` — when continuity fails
- `/write-short-film` — 14-day process
- `/script-diagnosis` — 7-pass screenplay analysis
- `/deploy-updates` — always last after web changes

Course/content:
- `/add-new-film-critique`
- `/create-new-worksheet`
- `/update-module-content`
- `/integrate-trip-locations`
- `/create-scenario-guide`
- `/setup-new-assignment`

**Skill vs workflow**: Skills = knowledge systems (lighting, sound). Workflows = process systems (produce a specific output across domains).

---

## PROJECT CONSTANTS

- **Local path**: `c:\Users\rober\CascadeProjects\tokyo-in-film`
- **Git remote**: `origin → https://github.com/ChauesPrinciple/Tokyo-in-Film.git` (only remote)
- **Branch**: `main`
- **Deploy**: `git push origin main`
- **Live site**: `https://chauesprinciple.github.io/Tokyo-in-Film/` (served from `origin/main`, `.nojekyll` at repo root)
- **CSS version**: `style.css?v=21` (increment on style changes)
- **Encoding**: UTF-8 no BOM. Japanese text → `[System.IO.File]` API, not `Get-Content`.

---

## CANON & VOICE — pointers only

- Course film canon, voice rules, em-dash ban, chapter numbering: **`VOICE.md`** (repo root). Read first whenever editing textbook prose.
- Craft theory, narrative frameworks, cross-domain integration, prose craft rules: **`NARRATIVE_REFERENCE.md`** (this folder).
- Per-skill craft theory and source citations: the individual `skill.md` files in `.windsurf/skills/<name>/`.

When this file disagrees with a skill file, the skill file wins for craft claims; this file wins for routing.
