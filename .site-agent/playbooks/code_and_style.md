# Playbook: Code and Style

## Steps

1. Shared components go in `style.css` in the matching section ("Shared guide / worksheet components", "Page-level components", "Utilities" last). Use a per-page `<style>` block only for one page.
2. Use the existing tokens (`--bg-color`, `--accent-neon-cyan`, `--accent-neon-pink`, `--font-body`). Fonts are locked.
3. Nav, head, and footer changes go in `tools/partials/`. Never edit a build region in a page.
4. Edit files with a method that preserves UTF-8 without BOM and the file's existing line endings.
5. Run `python tools/build.py`, then `python tools/check.py`, then review `git diff --stat` to confirm only the intended files and lines changed.
