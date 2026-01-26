$replacements = @{
    "scene-project.html"                = @{
        "technical mastery—it’s about" = "technical mastery. It’s about"
        "technical mastery—it's about" = "technical mastery. It's about"
    }
    "post-production/sound-design.html" = @{
        "sounds arent just cleaned up—theyre"                               = "sounds aren't just cleaned up; they're"
        "moments—when time bends and their worlds blur together—that sound" = "moments. When time bends and their worlds blur together, sound"
        "mirror this—it"                                                    = "mirror this; it"
        "on set—they"                                                       = "on set. They"
        "on screen—it"                                                      = "on screen. It"
        "But its in the"                                                    = "But it's in the"
        "Its dissonant"                                                     = "It's dissonant"
    }
}

foreach ($file in $replacements.Keys) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw -Encoding UTF8
        $newContent = $content
        $modified = $false
        
        foreach ($key in $replacements[$file].Keys) {
            if ($newContent.Contains($key)) {
                $newContent = $newContent.Replace($key, $replacements[$file][$key])
                $modified = $true
                Write-Host "  Fixed: '$key'"
            }
            else {
                # Write-Host "  Not found: '$key'"
            }
        }
        
        if ($modified) {
            Set-Content $file -Value $newContent -Encoding UTF8 -NoNewline
            Write-Host "Saved changes to $file"
        }
    }
}
