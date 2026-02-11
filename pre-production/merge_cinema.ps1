
$origPath = "c:\Users\rober\.gemini\antigravity\scratch\tokyo-in-film\pre-production\cinematography.html"
$newPath = "c:\Users\rober\.gemini\antigravity\scratch\tokyo-in-film\pre-production\cinematography_new_content.html"

$origLines = Get-Content $origPath -Encoding UTF8
$newLines = Get-Content $newPath -Encoding UTF8

# Index 610 is where we split.
# In PowerShell array slicing: 0..609 is top. 610..end is bottom.
$topPart = $origLines[0..609]
$bottomPart = $origLines[610..($origLines.Count - 1)]

# New content slicing.
# We determined lines 57 to 810 (1-based) -> indices 56 to 809 (0-based)
$newContent = $newLines[56..809]

$sep = @"

        <!-- MERGED NEW CONTENT BEGINS -->
        <hr style="margin: 5rem 0; border: 0; border-top: 4px solid var(--accent-neon-cyan);">
        <h1 style="text-align: center; font-size: 3rem; margin-bottom: 2rem;">Expanded Concepts & Visual Examples</h1>
        <div class="textbook-content">
"@

# Combine
$linesToWrite = $topPart + $sep + $newContent + $bottomPart

# Write back
$linesToWrite | Set-Content $origPath -Encoding UTF8
Write-Output "Successfully merged cinematography files."
