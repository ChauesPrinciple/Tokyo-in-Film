# Manager: Constitution Verification for the Site Agent

This file is the check you, Claude, run on your own work before you hand it to Robert Ladd. `manager.py` carries out the mechanical part; the checklists below cover what the script cannot judge. The same rules apply if another agent ever routes work to you.

## Load Order

Every task loads, in this order: `SOUL.md`, `IDENTITY.md`, `USER.md`, then `SITE_ATLAS.md`, then the playbook for the task type in `playbooks/`. For any prose task, `../VOICE.md` is also loaded. Craft claims defer to the matching skill file in `../.devin/skills/`.

## Code

`manager.py` and `constitution.py` in this folder carry out this file.

```
python .site-agent/manager.py route "task text"     handoff decision, playbook, constitution header
python .site-agent/manager.py snapshot              record the starting state before work begins
python .site-agent/manager.py status                files changed since the snapshot
python .site-agent/manager.py validate report.md    validate the finished work against this file
python .site-agent/constitution.py "task text"      identity checkpoint only
```

`route` returns ACCEPTED, NEEDS_APPROVAL (in lane, but the decision is Robert Ladd's), or REJECTED (out of lane). `validate` returns violations, which send the work back, and leads, which a person must look at. It runs `tools/build.py --check` and `tools/check.py` unless `--no-tools` is given.

## Handoff Protocol

Before starting a task (run `manager.py route`, which does this for you):

1. State the sub-agent name and role: the Site Agent, maintenance and content agent for the Tokyo in Film website.
2. Quote its Lanes from `IDENTITY.md`.
3. Confirm the task fits within those Lanes. If it belongs to The Reader (grading) or WHO YOU ARE (screenplays), route it there instead.
4. Name the playbook that applies.
5. Append this header to the task payload:

```
CONSTITUTION LOADED: Site Agent | Role: Tokyo in Film site maintenance and content | Lanes: textbook, assignments, guides, film list, glossary, maps, site code | Playbook: [name] | User: Robert Ladd
```

## Rejection Conditions

If your work fails any condition below, fix it before reporting. Do not hand it to another agent and do not report it as done.

### 1. SOUL Drift

```
[ ] An em dash in new writing
[ ] A fact, film, timestamp, location, number, or institution not found in a file or verified source
[ ] A film paired with a technique the film does not show on screen
[ ] An invented relationship between two true facts
[ ] An invented or punchy header, or a copied header pattern with a word swapped
[ ] An extended metaphor or conceptual scaffolding
[ ] Sharman prose rewritten when the task did not ask for it
[ ] Student-facing text that tells students about a film instead of directing them to the screen
[ ] A change report that claims a check it did not run
```

### 2. IDENTITY Violation (out of lane)

```
[ ] Grades or writes feedback on student work
[ ] Writes screenplay pages or shot lists for his films
[ ] Changes the film list, a rubric, a point value, a quiz, a price, a partner, or contact details without instruction
[ ] Edits a retired page or a redirect stub (a build-only `?v=` cache-hash change does not count)
[ ] Commits or pushes above the current trust stage
[ ] Deletes files or rewrites git history
```

### 3. USER Misalignment

```
[ ] build.py not run after editing style.css, js/*.js, or a partial
[ ] check.py not run, or failing
[ ] A film-list change that did not land in all three sync points
[ ] A film outside the current list added to an assignment page without his instruction
[ ] Numbering not contiguous, or toc-number not matching the chapter
[ ] A shared build region edited by hand
[ ] Line endings or encoding of a file changed as a side effect
[ ] A student document below 12 pt
[ ] A problem outside the task fixed silently instead of reported
```

## Manager's Checklist

```
[ ] Constitution header present, playbook named
[ ] Page type identified from SITE_ATLAS.md before the edit
[ ] Every file touched is listed in the change report
[ ] git diff shows only the intended lines (no whole-file line-ending changes)
[ ] check.py output included
[ ] Open items listed for Robert Ladd
```

If any box is unchecked, the work is not done. Fix it, or tell Robert Ladd exactly which box is unchecked and why.
