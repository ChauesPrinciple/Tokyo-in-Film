---
description: Update CSS version number across all HTML files when styles are modified
tags: [css, cache-busting, maintenance]
---

# Update CSS Version Skill

## Purpose
Increment the CSS version query parameter in all HTML files to force browser cache refresh after style changes.

## Current Version
**style.css?v=12**

## When to Use
- After modifying `style.css`
- When style changes don't appear on live site
- Before deploying style updates

## Files to Update
All HTML files that link to `style.css`:

- `index.html`
- `textbook.html`
- `scene-project.html`
- `glossary.html`
- `free-guides.html`
- `pre-production/*.html` (6 files: 1.1-1.6 + guide.html)
- `production/*.html` (5 files: 2.1-2.5 + guide.html)
- `post-production/*.html` (5 files: 3.1-3.5 + guide.html)
- `guides/*.html` (15 worksheet files)

## Update Process

### Step 1: Determine new version
Current version is **v=12**. Increment to **v=13**.

### Step 2: Search and replace
Use PowerShell with UTF-8 encoding:

```powershell
$files = Get-ChildItem -Recurse -Include *.html
foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    $content = $content -replace 'style\.css\?v=12', 'style.css?v=13'
    [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
}
```

### Step 3: Verify
Check a few files to confirm:

```bash
grep -n "style.css?v=" index.html pre-production/guide.html
```

## CRITICAL: UTF-8 Encoding
**NEVER** use plain PowerShell `Get-Content` or `Set-Content` for this task. They use Windows-1252 encoding and will corrupt Japanese characters (kanji).

**Always use:**
- `[System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)`
- `[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)`

## Verification Checklist
- [ ] All HTML files updated to new version
- [ ] No Japanese characters corrupted
- [ ] Test one page locally to confirm styles load
- [ ] Commit and deploy changes

## Common Issues

### Styles not updating after version bump
- Clear browser cache (Ctrl+F5 / Cmd+Shift+R)
- Check browser dev tools Network tab to verify new version is loading
- Verify version number in HTML source matches CSS file link

### Encoding corruption
If Japanese characters appear as gibberish after update, the file was saved with wrong encoding. Revert and use UTF-8 encoding method above.
