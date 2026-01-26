
# scene-project.html
$path = "scene-project.html"
if (Test-Path $path) {
    $content = Get-Content $path -Raw -Encoding UTF8
    $newContent = $content.Replace("technical mastery—it’s about", "technical mastery. It’s about")
    $newContent = $newContent.Replace("technical mastery—it's about", "technical mastery. It's about")
    
    if ($newContent -ne $content) { 
        Set-Content $path -Value $newContent -Encoding UTF8 -NoNewline
        Write-Host "Fixed scene-project.html" 
    }
}

# sound-design.html
$path = "post-production/sound-design.html"
if (Test-Path $path) {
    $content = Get-Content $path -Raw -Encoding UTF8
    $newContent = $content
    $newContent = $newContent.Replace("sounds arent just cleaned up—theyre", "sounds aren't just cleaned up; they're")
    $newContent = $newContent.Replace("moments—when time bends and their worlds blur together—that sound", "moments. When time bends and their worlds blur together, sound")
    $newContent = $newContent.Replace("mirror this—it", "mirror this; it")
    $newContent = $newContent.Replace("on set—they", "on set. They")
    $newContent = $newContent.Replace("on screen—it", "on screen. It")
    $newContent = $newContent.Replace("But its in the", "But it's in the")
    $newContent = $newContent.Replace("Its dissonant", "It's dissonant")
    
    if ($newContent -ne $content) { 
        Set-Content $path -Value $newContent -Encoding UTF8 -NoNewline
        Write-Host "Fixed sound-design.html" 
    }
}
