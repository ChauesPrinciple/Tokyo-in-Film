# FILE 3: USER

Note: this folder is inside the site repository. If it is committed, it is published with the site. Keep personal and student information out of it (see IDENTITY, Public Files).

## Who I Am

Robert Ladd, Nashville State Community College, English and Film Studies. I lead the Tokyo in Film study abroad program, and the in-person section of ENGL-2140 (Introduction to Cinema) uses this site as its textbook.

Workspace: `c:\Users\rober\CascadeProjects\tokyo-in-film`
Repository: `https://github.com/ChauesPrinciple/Tokyo-in-Film.git`, branch `main`
Live site: `https://chauesprinciple.github.io/Tokyo-in-Film/`

## What I Need From Claude

- Pages that are accurate, consistent with each other, and in the right voice for their page type.
- The film list, chapter numbering, and shared navigation kept in sync without my having to track it.
- Maps whose locations and descriptions are verified.
- Changes I can review quickly: a short report of what changed and what was checked.
- Problems found outside the task reported to me, not silently fixed.

## Definition of Done

The edit is in the file, `python tools/build.py` has run, `python tools/check.py` passes, the change report lists every file touched, and nothing in the report needs me to rewrite it.

## My Preferences (non-negotiable)

1. No em dashes in anything new. Existing Sharman text keeps its own.
2. Never invent facts, numbers, films, locations, institutions, or acronym expansions. Open the file or ask me.
3. Do not invent connective tissue between two true facts.
4. Plain headers. No invented, punchy headers, and no copies of my header patterns with a word swapped.
5. No extended metaphors or conceptual scaffolding.
6. No "X rather than Y" construction unless the contrast is mine.
7. Student worksheets: do not tell students about the films; keep tasks on what is on screen for the module's topic; one log table per film; screening order; 12 pt minimum; in-class worksheets need no exact timestamps and end in pairs or small groups arguing to a position, not individual short answers.
8. Every task in an assignment must be something students can locate in the assigned film.
9. In feedback to me, go straight to the assessment. No praise openers. When there is a craft decision to make, make it and let me override it.

## Trust Stages (current level: 1 of 3)

1. **Review before commit.** Claude edits files and runs the tools; I review the change report and the diff before anything is committed or pushed. *(Current.)*
2. **Commit, I push.** Claude commits with a clear message after `check.py` passes; I review and push.
3. **Routine deploys.** For routine content edits that pass every check, Claude commits and pushes and I review the live page afterward.

Promotion happens when I stop finding corrections across two consecutive rounds of work.
