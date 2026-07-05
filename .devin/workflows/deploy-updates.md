---
description: Deploy website updates to GitHub Pages after making changes
---

# Deploy Website Updates Workflow

## When to Use
After making any changes to HTML, CSS, JavaScript, or content files that need to go live.

## Steps

### 1. Verify .nojekyll file exists
```bash
ls .nojekyll
```

### 2. Test changes locally (if applicable)
```bash
python -m http.server 8080
```
Open http://localhost:8080 in browser to verify changes.

### 3. Stage all changes
```bash
git add .
```

### 4. Commit with descriptive message
```bash
git commit -m "Brief description of what changed"
```
Examples:
- "Fix reflection questions in production guide"
- "Add Kukyo Hall POI to JJK map"
- "Update CSS version to v13"

### 5. Push to GitHub Pages
```bash
git push origin tokyo-main:main
```

### 6. Verify deployment
Wait 1-2 minutes, then visit:
https://chauesprinciple.github.io/Tokyo-in-Film/

### 7. Clear cache if needed
If changes don't appear, hard refresh:
- Windows: Ctrl + F5
- Mac: Cmd + Shift + R

## Pre-Deployment Checklist
- [ ] All files use UTF-8 encoding (especially files with Japanese text)
- [ ] No broken links
- [ ] CSS version incremented if styles changed
- [ ] JavaScript has no console errors
- [ ] Tested on local server if possible

## Rollback if Needed
```bash
git log --oneline -5
git revert <commit-hash>
git push origin tokyo-main:main
```
