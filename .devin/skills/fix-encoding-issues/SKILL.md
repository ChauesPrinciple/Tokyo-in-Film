---
description: Fix UTF-8 encoding issues with Japanese characters in HTML files
tags: [encoding, utf-8, japanese, kanji, corruption]
---

# Fix Encoding Issues Skill

## Purpose
Diagnose and fix UTF-8 encoding corruption in HTML files containing Japanese text (kanji, hiragana, katakana).

## Common Symptoms
- Japanese characters display as gibberish (e.g., `æ±äº¬`)
- Question marks or boxes instead of kanji
- Corrupted ward names in maps (渋谷区 becomes garbage)
- Mixed encoding in same file

## Root Cause
PowerShell's default `Get-Content` and `Set-Content` use Windows-1252 encoding, which corrupts UTF-8 multi-byte characters.

## CRITICAL RULE
**NEVER use plain PowerShell cmdlets for files with Japanese text:**
- ❌ `Get-Content`
- ❌ `Set-Content`
- ❌ `Out-File`

**ALWAYS use .NET methods with explicit UTF-8:**
```powershell
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
```

## Python Alternative
Python handles UTF-8 correctly by default:
```python
with open('file.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Make changes...

with open('file.html', 'w', encoding='utf-8') as f:
    f.write(content)
```

## Diagnosis Script
```powershell
# Check if file has Japanese characters
$content = [System.IO.File]::ReadAllText("path\to\file.html", [System.Text.Encoding]::UTF8)
if ($content -match '[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]') {
    Write-Host "File contains Japanese characters - use UTF-8 encoding"
} else {
    Write-Host "No Japanese characters detected"
}
```

## Files Requiring UTF-8
- All anime map HTML files (JJK, Tokyo Ghoul, Chainsaw Man)
- Any file with ward names (区)
- Module pages with Japanese location names
- Glossary entries with Japanese terms

## Recovery Process
If encoding is already corrupted:

1. **Check git history** for uncorrupted version:
```bash
git log --oneline -- path/to/file.html
git show <commit-hash>:path/to/file.html > recovered.html
```

2. **Revert to last good commit:**
```bash
git checkout <commit-hash> -- path/to/file.html
```

3. **Manual fix** if no git history:
- Find original source (KML, JSON, external file)
- Re-extract Japanese text
- Paste into file using UTF-8 editor

## Prevention Checklist
- [ ] Use UTF-8 encoding methods for all edits
- [ ] Test Japanese characters after bulk edits
- [ ] Verify ward names display correctly
- [ ] Check browser displays kanji properly
- [ ] Commit frequently to preserve good versions

## Existing Fix Scripts
Reference these scripts for UTF-8 handling examples:
- `fix_encoding.py`
- `fix_encoding_safe.ps1`
- `fix_encoding_final.ps1`
- `cleanup_maps.py`
- `apply_geojson_pois.py`

## Testing
After fixing encoding:
```bash
# View file in browser
start http://localhost:8080/jjk-culling-game-map.html

# Check specific ward names
grep -n "渋谷区\|新宿区\|港区" jjk-culling-game-map.html
```

Expected output should show clean Japanese characters, not corrupted bytes.


---

## Sources

This skill is **procedural** — it does not make film-craft claims. Per `CITATION_PROTOCOL.md` the citation discipline does not apply to procedural workflows (deployment, formatting, encoding, file management). If this skill is later extended with craft-level reasoning, replace this block with citations to the relevant entries in `SOURCE_INDEX.md`.