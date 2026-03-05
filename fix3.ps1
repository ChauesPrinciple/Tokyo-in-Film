$u = [System.Text.UTF8Encoding]::new($false)
$changed = 0

function Repair3($c) {
    # ---- Accented characters corrupted to ? ----
    $c = $c.Replace("caf?.", "caf&eacute;.")
    $c = $c.Replace("caf? ", "caf&eacute; ")
    $c = $c.Replace("Cuar?n", "Cuar&oacute;n")
    $c = $c.Replace("Yasujir? Ozu", "Yasujir&#333; Ozu")

    # ---- Plural possessive s? -> s' ----
    $c = $c.Replace("characters? ", "characters&#8217; ")
    $c = $c.Replace("characters? ", "characters&#8217; ")

    # ---- Remaining em-dash patterns: word?word or word? word ----
    $dash = @(
        "them?list","them, list",
        "exposition?only","exposition, only",
        "land?cut","land, cut",
        "ambitious?they","ambitious, they",
        "imaginative?adding","imaginative, adding",
        "interestingly?as","interestingly, as",
        "cleanse?relief","cleanse, relief",
        "courage?and","courage, and",
        "bonding?it","bonding, it",
        "stated?or","stated, or",
        "redefined?not","redefined, not",
        "feels?because","feels, because",
        "places?they","places, they",
        "survival?it","survival, it",
        "feel?they","feel, they",
        "identity?or","identity, or",
        "war?but","war, but",
        "time?and","time, and",
        "memory?erases","memory erases",
        "production?all","production, all",
        "lighting? Basically","lighting, basically",
        "And? ACTION","And... ACTION",
        "But wait? sound","But wait, sound"
    )
    for ($i=0; $i -lt $dash.Count; $i+=2) { $c = $c.Replace($dash[$i], $dash[$i+1]) }

    # ---- shoot-day-checklist: beginning"?middle"?end ----
    $c = $c.Replace('beginning"?middle"?end', "beginning, middle, end")

    return $c
}

Get-ChildItem -Recurse -Include "*.html" | ForEach-Object {
    $orig = [System.IO.File]::ReadAllText($_.FullName, $u)
    $fixed = Repair3 $orig
    if ($fixed -ne $orig) {
        [System.IO.File]::WriteAllText($_.FullName, $fixed, $u)
        Write-Host "Fixed: $($_.FullName.Replace((Get-Location).Path+'\',''))"
        $script:changed++
    }
}
Write-Host "Done. $changed file(s) modified."
