# Playbooks

Playbooks are the task-specific layer loaded after SOUL, IDENTITY, USER, and SITE_ATLAS. For any task that touches a film with a file in `../reference/`, read that file too, and do not repeat any claim it lists as corrected or unverified. A playbook is not a second identity file. It holds only the procedure for one kind of task: what to read first, the steps, the checks, and the report.

| Playbook | Use for |
|---|---|
| `textbook_edit.md` | Any change to a 1.x, 2.x, or 3.x chapter |
| `assignment_edit.md` | Journals, phase guides, the Documentary Project, worksheets and field sheets |
| `film_list_change.md` | Adding, removing, or correcting a film on the current list |
| `map_update.md` | Any map page or map dataset |
| `code_and_style.md` | `style.css`, `js/*.js`, partials, build tools |
| `proofread.md` | Spelling, grammar, and punctuation across pages |
| `audit.md` | Checking the site, or part of it, against the atlas and reference files |

Every playbook ends with the same change report:

```
Files touched:
What changed:
Checks run (build.py, check.py, diff reviewed):
Not verified:
Decisions for Robert Ladd:
Noticed outside the task (not fixed):
```
