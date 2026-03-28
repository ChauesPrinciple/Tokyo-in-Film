---
description: Deploy Tokyo in Film website to GitHub Pages
tags: [deployment, git, github-pages]
---

# Deploy Site Skill

## Purpose
Deploy the Tokyo in Film static website to GitHub Pages after making updates.

## Repository Info
- **Local Path:** `c:\Users\rober\CascadeProjects\tokyo-in-film`
- **Remote:** `origin → https://github.com/ChauesPrinciple/Tokyo-in-Film.git`
- **Live Site:** `https://chauesprinciple.github.io/Tokyo-in-Film/`
- **Local Branch:** `tokyo-main`
- **Remote Branch:** `main`

## Deployment Steps

### 1. Verify .nojekyll exists
```bash
ls .nojekyll
```
This file must exist in the repo root to prevent Jekyll processing.

### 2. Stage changes
```bash
git add .
```

### 3. Commit with descriptive message
```bash
git commit -m "Description of changes"
```

### 4. Push to GitHub Pages
```bash
git push origin tokyo-main:main
```
This pushes the local `tokyo-main` branch to the remote `main` branch.

### 5. Verify deployment
Visit `https://chauesprinciple.github.io/Tokyo-in-Film/` after 1-2 minutes.

## Pre-Deployment Checklist
- [ ] Test all pages locally (use local server on port 8080)
- [ ] Verify no broken links
- [ ] Check CSS version is updated if styles changed
- [ ] Ensure UTF-8 encoding for all HTML files
- [ ] Verify .nojekyll file exists
- [ ] Check no sensitive data in commits

## Common Issues

### Jekyll Processing
**Symptom:** Underscores in filenames cause 404s
**Fix:** Ensure `.nojekyll` file exists in root

### CSS Not Updating
**Symptom:** Style changes don't appear on live site
**Fix:** Increment version in `style.css?v=XX` query parameter in all HTML files

### UTF-8 Encoding
**Symptom:** Japanese characters display as gibberish
**Fix:** Always use UTF-8 encoding when editing files, never Windows-1252

## Rollback Procedure
If deployment breaks the site:

```bash
git log --oneline -5
git revert <commit-hash>
git push origin tokyo-main:main
```

## Cache Clearing
After deployment, users may need to hard refresh:
- **Windows:** Ctrl + F5
- **Mac:** Cmd + Shift + R
