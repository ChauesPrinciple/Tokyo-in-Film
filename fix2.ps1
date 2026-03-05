$u = [System.Text.UTF8Encoding]::new($false)
$changed = 0

function Repair($c) {
    # ---- Specific curly-quote corruption pairs (?word? -> "word") ----
    $cqPairs = @(
        '?putting on stage.??','"putting on stage."',
        '?overall look,??','"overall look,"',
        '?author??','"author"',
        '?character design,??','"character design,"',
        '?costume??','"costume"',
        '?good??','"good"',
        '?property??','"property"',
        '?interesting??','"interesting"',
        '?interesting?','"interesting"',
        '?rule of thirds?','"rule of thirds"',
        '?slow-motion??','"slow-motion"',
        '?slow-motion?','"slow-motion"',
        '?slow??','"slow"',
        '?slow?','"slow"',
        '?Slow??','"Slow"',
        '?Slow?','"Slow"',
        '?in-camera??','"in-camera"',
        '?in-camera?','"in-camera"',
        '?bullet time??','"bullet time"',
        '?bullet time?','"bullet time"',
        '?normal??','"normal"',
        '?normal?','"normal"',
        '?rasterized??','"rasterized"',
        '?rasterized?','"rasterized"',
        '?establishes??','"establishes"',
        '?establishes?','"establishes"',
        '?Keystone Kops??','"Keystone Kops"',
        '?Keystone Kops?','"Keystone Kops"',
        '?10??','"10"',
        '?10?','"10"',
        '?driving??','"driving"',
        '?driving?','"driving"',
        '?Focus Puller,?','Focus Puller,',
        '?Focus Puller??','"Focus Puller"',
        '?Focus Puller?','"Focus Puller"',
        'the ?Fo','the &Eacute;clair',
        '?clair ','&Eacute;clair ',
        '?author?? ','"author" '
    )
    for ($i=0; $i -lt $cqPairs.Count; $i+=2) { $c = $c.Replace($cqPairs[$i], $cqPairs[$i+1]) }

    # ---- Stray ? after closing straight double-quote (e.g. "fast"? -> "fast") ----
    $c = [regex]::Replace($c, '"([^"<\n]{1,80})"\?(?=[^=\w])', '"$1"')
    $c = [regex]::Replace($c, '"([^"<\n]{1,80})"\?(<)', '"$1"$2')

    # ---- Generic remaining ?word? patterns (opening/closing curly quote both -> ?) ----
    $c = [regex]::Replace($c, '(?<=[(\s>])\?([A-Za-z0-9][^?<\n]{1,60}[A-Za-z0-9,.])\?(?=[)\s<,.])', '"$1"')

    # ---- Stripped apostrophes ----
    $strip = @(
        "Lets take","Let&#8217;s take",
        "lets take","let&#8217;s take",
        "Thats because","That&#8217;s because",
        "Thats cinema","That&#8217;s cinema",
        "Thats called","That&#8217;s called",
        "Thats a lot","That&#8217;s a lot",
        "Thats ","That&#8217;s ",
        "theyre ","they&#8217;re ",
        "theyre,","they&#8217;re,",
        "theyre.","they&#8217;re.",
        "theyre<","they&#8217;re<",
        "theyve ","they&#8217;ve ",
        "theyll ","they&#8217;ll ",
        "weve ","we&#8217;ve ",
        "well see","we&#8217;ll see",
        "well get","we&#8217;ll get",
        "oclock","o&#8217;clock",
        " its "," it&#8217;s ",
        " its,"," it&#8217;s,",
        " its."," it&#8217;s.",
        "Its ","It&#8217;s ",
        "directors vision","director&#8217;s vision",
        "artists sensibility","artist&#8217;s sensibility",
        "screens ability","screen&#8217;s ability",
        "filmmakers intention","filmmaker&#8217;s intention",
        "Miyazakis ","Miyazaki&#8217;s ",
        "were going wide","we&#8217;re going wide"
    )
    for ($i=0; $i -lt $strip.Count; $i+=2) { $c = $c.Replace($strip[$i], $strip[$i+1]) }

    # ---- Lone ? used as dash: convert to comma ----
    $c = $c.Replace("or? horrifying","or, horrifying")
    $c = $c.Replace("the shoulder? of","the shoulder of")
    $c = [regex]::Replace($c, '([a-zA-Z,]) \? ([a-zA-Z])', '$1, $2')

    # ---- Em-dashes -> comma (style guide: no em-dashes) ----
    $c = $c.Replace(" &mdash; ", ", ")
    $c = $c.Replace("&mdash;", ",")

    return $c
}

Get-ChildItem -Recurse -Include "*.html" | ForEach-Object {
    $orig = [System.IO.File]::ReadAllText($_.FullName, $u)
    $fixed = Repair $orig
    if ($fixed -ne $orig) {
        [System.IO.File]::WriteAllText($_.FullName, $fixed, $u)
        Write-Host "Fixed: $($_.FullName.Replace((Get-Location).Path+'\',''))"
        $script:changed++
    }
}
Write-Host "Done. $changed file(s) modified."
