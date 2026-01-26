$path = "c:\Users\rober\.gemini\antigravity\scratch\tokyo-in-film\production\cinematography.html"
$content = Get-Content $path -Raw -Encoding UTF8
$startStr = "            <p>Okay, so that's super creepy."
$nextSectionStr = "            <p>Let's look at one more example"

$firstIndex = $content.IndexOf($startStr)
if ($firstIndex -eq -1) {
    Write-Host "Could not find first occurrence"
    exit
}

$secondIndex = $content.IndexOf($startStr, $firstIndex + 1)
if ($secondIndex -eq -1) {
    Write-Host "Could not find second occurrence"
    exit
}

$endIndex = $content.IndexOf($nextSectionStr, $secondIndex)
if ($endIndex -eq -1) {
    Write-Host "Could not find start of next section"
    exit
}

# Remove everything from start of duplicate to start of next section
$length = $endIndex - $secondIndex
$content = $content.Remove($secondIndex, $length)

Set-Content $path -Value $content -Encoding UTF8 -NoNewline
Write-Host "Fixed duplicate safely."
