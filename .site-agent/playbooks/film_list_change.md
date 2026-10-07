# Playbook: Film List Change

Only on Robert Ladd's instruction.

## Steps

1. Get from him: the film, the year, the director, and whether it is added or removed. Verify the IMDb ID.
2. Update all three sync points: `index.html` slides, `index.html` `filmData`, `textbook.html` slides. Keep alphabetical order and update the slide counter total.
3. Update the course filmography if the film is new to the course.
4. Update `../VOICE.md` section 3.
5. Search every assignment page (journals, phase guides, scaffolds, Documentary Project "Where to Steal From") for the film and report each hit. Do not change those pages unless asked.
6. Report map datasets and `filmData` "Referenced In" pages that mention the film.
7. Run `python tools/check.py`; confirm the slide count matches on both pages.
