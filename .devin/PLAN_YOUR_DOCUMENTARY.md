# PLAN — Scene Project → "The Documentary Project" Rebuild

**Status:** IMPLEMENTED Aug 11, 2026 (all 10 steps of §6 executed; deadlines intentionally omitted).
**Drafted:** Aug 11, 2026.

**LOCKED DECISIONS:** teams of 3 (freedom); **7 recreated shots** (not 3); NO deadlines on the page (irrelevant right now); reuse `assets/scene-project.mp4` hero video; nav label "The Documentary Project" (renamed from "Your Documentary" same day, owner correction: match old "The X Project" convention); infinite game framing used BOTH student-facing and internally.

---

## 1. Concept (what changes pedagogically)

The Scene Project (recreate/adapt/create a fiction scene, teams of 3, 2–8 min) is retired.
It is replaced by **The Documentary Project**, the capstone for the "infinite game" project slot
(previous year's submissions were weak — see §7 for the structural fixes that address why).

**The assignment:** Each student (or team — see Open Q1) makes a short documentary about
a Tokyo place, neighborhood, or location they love, OR a skill they encountered through
the course films (tate/sword choreography, taido, voice acting, ramen craft, sushi craft,
street racing culture, etc.). Example: a ramen documentary emulating *Ramen Heads* and
*Tampopo*, shot in Tokyo Ramen Street or Golden Gai.

**The spine of the project — shot recreation:** The documentary must contain recreated
**establishing shots and B-roll shots from the 2026 film canon**, re-staged at real Tokyo
locations. Underneath each recreation sits a written **composition analysis** of the
original shot (rule of thirds, leading lines, headroom, depth layers, camera height,
focal length estimate, time of day/light direction) proving the student understood the
frame before recreating it.

**The editing thesis — two cuts from one footage pool:** Students deliver BOTH a
**90-second cut** and a **3:00 cut** of the same documentary. Same footage, two tellings.
This operationalizes "a story is made 3 times — writing, filming, editing" and forces
real editorial decision-making instead of a single bloated timeline.

---

## 2. URL / file architecture decision

| Item | Decision |
|---|---|
| New page | `documentary-project.html` at repo root |
| Old page | `scene-project.html` becomes a meta-refresh redirect stub → `documentary-project.html` (GitHub Pages has no server redirects; external links/bookmarks must not 404) |
| Hero video | Reuse `assets/scene-project.mp4` initially; rename/replace later if owner supplies doc-flavored footage (Open Q4) |
| New guide page | `guides/editing-basics-guide.html` — houses the owner-supplied "Basics of Editing" text (§5). `guides/` is the right home: standalone craft worksheet, no film-canon obligations per SITE_MAP §1 |

## 3. Site-wide nav change (the expensive part)

The nav item `<li><a href="scene-project.html">The Scene Project</a></li>` exists in
**~46 HTML files** (all root pages, all pre/production/post pages, all 15 guides pages).

- Change to: `<li><a href="documentary-project.html">The Documentary Project</a></li>`
  (relative prefix `../` on subdirectory pages — match each file's existing pattern).
- Mechanical find/replace via `[System.IO.File]::ReadAllText/WriteAllText` UTF8 no-BOM
  script in `$env:TEMP` (per encoding rule — never plain `Get-Content`).
- Also update: `index.html` course-module card + `textbook.html` twin card if they
  reference the Scene Project by name (verify at implementation), and the
  `free-guides.html` card row.

---

## 4. New page structure — `documentary-project.html`

Same visual system as current page (hero + `project-section` blocks + `option-card` grid
+ `grid-2-col` stages). Sharman voice: 2nd person, parenthetical asides, no em dashes.

### §A Hero
- H1: "The Documentary Project"
- Tagline: "One place. One craft. Two cuts." (draft — owner may reword)

### §B Introduction
- Frame: you have spent the course watching how films see Tokyo; now you document how
  YOU see it. The films are your visual vocabulary; the city is your subject.
- Explicitly name the two subject strands:
  1. **A place** — neighborhood, shop, station, shrine, arcade, river walk.
  2. **A craft/skill** — tate, taido, voice acting, ramen/sushi making, drifting culture,
     anything encountered through the canon.

### §C "Steal Like a Documentarian" — the shot-recreation requirement
- Requirement: **minimum 7 recreated shots** (at least 2 establishing, at least 2 B-roll
  cut-in/cutaway) sourced from the 2026 canon, re-staged in Tokyo.
- Each recreation ships with a **Shot-Match Sheet** (1 page each):
  - Frame grab of original (film, timestamp)
  - The recreation frame
  - Composition annotation: rule of thirds placement, leading lines, headroom/looking
    room, foreground/midground/background layers, camera height, estimated focal length,
    light direction / time of day
  - One sentence: what the original shot is DOING for its film, and what the recreation
    does for yours
- Canon anchor examples to cite on the page (pairing discipline — all verified):
  - *Ramen Heads* / *Jiro Dreams of Sushi* — food-craft macro B-roll, workspace establishers
  - *Tampopo* — kitchen choreography, eating close-ups
  - *Exit 8* — subway corridor symmetry, one-point perspective
  - *Your Name* — Yotsuya/Suga Shrine establishers (real pilgrimage sites already in filmData)
  - *Jujutsu Kaisen* — Shibuya/Harajuku establishers (real sites in filmData)
  - *13 Assassins* / *Rurouni Kenshin: The Beginning* — for tate/skill-strand docs: how
    action is covered, not the fight itself
  - *Rental Family* — observational Tokyo street style
  - *Outrage* / *Ju-On* — static dread framing, domestic interiors (use sparingly)

### §D Development Stages (three columns mirroring course arc)
- **I. Pre-Production:** subject pitch + greenlight (instructor as producer); shot list
  that MARKS which shots are recreations; location/permission sanity check; interview
  question list if using VO/interviews.
- **II. Production:** shoot the doc footage AND the recreations; 10x footage rule
  carried over; audio discipline (room tone, clean interview sound).
- **III. Post-Production:** assembly → 3:00 cut → compress to 90-second cut (order
  matters: long cut first, then the kill-your-darlings pass). Editing vocabulary
  requirements per §E.

### §E Editing requirements (ties to the new guide page)
The two cuts must demonstrably use, and the student must name in their reflection:
- At least one **J cut** and one **L cut** (interview/VO-driven docs make these natural)
- At least one **cutaway** over continuous audio
- Optional: jump cuts (interview compression), parallel editing (place + craft strands)
- Transitions used intentionally (dissolve/fade choices explained in one line each)
- Continuity checks: no black holes, no flash frames, sync verified, color/brightness
  matched within scenes, audio levels mixed
- Project settings guidance: 1920x1080, 23.98 fps
- Free software: CapCut, DaVinci Resolve, ClipChamp
→ All of this lives in full on `guides/editing-basics-guide.html`; the project page
  summarizes and links.

### §F Deliverables + deadlines
| Deliverable | Spec |
|---|---|
| 3:00 cut | 2:45–3:15 tolerance, 1080p MP4, titles + credits |
| 90-second cut | 1:20–1:40 tolerance, same footage pool, standalone-watchable |
| Shot-Match Sheets | min 7, PDF or images |
| Pre-production pack | pitch, shot list (recreations flagged), interview questions |
| Self-evaluation | written/oral/video, includes the editing-vocabulary reflection (§E) |
| Collaborative requirement | carry over: 2 hours on another project, with proof |
| Extra credit | behind-the-scenes reel (carry over) |
Deadlines: intentionally omitted from the page (owner decision); add later when set.

### §G Evaluation rubric (rebuilt — see §7)
Weighted, published on the page:
- Shot-Match Sheets + recreation fidelity/analysis — 30%
- Editing craft (two-cut comparison, §E vocabulary in evidence) — 25%
- Documentary voice (subject clarity, access, audio) — 20%
- Process (checkpoints hit, pitch, shot list discipline) — 15%
- Reflection — 10%

### §H Closing CTA
- Keep the "no time for second-guessing" energy; button → `pre-production/index.html`
  and a second button → `guides/editing-basics-guide.html`.

---

## 5. New guide page — `guides/editing-basics-guide.html`

Owner-supplied text, adapted to house style (headings, tables where useful, Sharman
voice pass, no em dashes). Content blocks:
1. "A story is made 3 times" framing
2. Setting up a project (1080p / 23.98)
3. Basic edit types: J/L cuts, jump cuts, cutaways, parallel editing
4. Transitions: dissolve, fade to/from black, wipes
5. "During your process, look at the types of edits your film uses and ask why" —
   direct bridge to the shot-recreation analysis habit
6. Color and lighting continuity
7. Audio mixing basics
8. Watch-outs: black holes, flash frames, sync, continuity
9. Free software list
- Add card to `free-guides.html` ("Filmmakers Toolkit").
- Glossary additions to `js/glossary.js` if absent (verify at implementation):
  J cut, L cut, jump cut, cutaway, parallel editing, dissolve, wipe, flash frame,
  room tone, assembly cut.

---

## 6. Cross-file sync checklist (implementation order)

1. Create `guides/editing-basics-guide.html` (no dependencies)
2. Create `documentary-project.html` (links to #1)
3. Convert `scene-project.html` to redirect stub
4. Site-wide nav find/replace (~46 files, UTF8 no-BOM script)
5. Update `index.html` + `textbook.html` capstone cards (if any)
6. Add `free-guides.html` card
7. Glossary term additions
8. Docs: `SITE_MAP.md` (root-pages table row + capstone description),
   `VOICE.md` if capstone is named anywhere
9. Bump `style.css?v=` ONLY if CSS changes (likely none — reuse existing classes)
10. Verify: grep for orphan "Scene Project" strings; click-test nav from root,
    subdirectory, and guides depth; validate redirect stub

## 7. Why last year's submissions failed → structural countermeasures

| Failure mode (inferred) | Countermeasure in this design |
|---|---|
| Vague creative brief ("recreate/adapt/create anything") | One format (documentary), two subject strands, hard shot quota |
| No forcing function for analysis | Shot-Match Sheets are graded artifacts, 30% of rubric |
| Single deliverable → last-minute bloated cut | Two cuts, long-then-short, rough assembly checkpoint mid-trip |
| Editing treated as afterthought | Editing vocabulary is a named requirement with a dedicated guide |
| Team diffusion of responsibility | Open Q1: consider solo or pairs instead of teams of 3 |

## 8. Out of scope (unchanged)

- Assignment/journal pages overhaul (still pending, separate effort)
- Film Coach relaunch (stays commented out; decide later if it moves to the new page)
- 2026 film canon (already synced Aug 11)

## 9. Open questions for owner

1. **Team size:** keep teams of 3, or solo/pairs? (Doc format works solo; recreations are easier with a second body.)
2. **Recreation quota:** is 3 shots (1 establishing + 1 B-roll minimum mix) the right floor?
3. **Deadlines:** confirm dates against the May itinerary (free days 5/19–21, 5/25–28; Yokohama Ramen Museum excursion pairs naturally with food-strand docs).
4. **Hero video:** keep `scene-project.mp4` or supply new footage?
5. **Name lock:** "The Documentary Project" as the nav label, or something shorter/punchier?
6. **Infinite game framing:** should the page explicitly use the "infinite game" language, or keep it internal?
