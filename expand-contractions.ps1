$u = [System.Text.UTF8Encoding]::new($false)
$changed = 0

function Expand($c) {
    # Both forms: literal apostrophe ' and HTML entity &#8217;
    foreach ($apos in @("'", "&#8217;")) {
        $c = $c.Replace("it${apos}s ",       "it is ")
        $c = $c.Replace("It${apos}s ",       "It is ")
        $c = $c.Replace("it${apos}s,",       "it is,")
        $c = $c.Replace("It${apos}s,",       "It is,")
        $c = $c.Replace("it${apos}s.",       "it is.")
        $c = $c.Replace("It${apos}s.",       "It is.")
        $c = $c.Replace("it${apos}s<",       "it is<")
        $c = $c.Replace("It${apos}s<",       "It is<")

        $c = $c.Replace("won${apos}t",       "will not")
        $c = $c.Replace("Won${apos}t",       "Will not")
        $c = $c.Replace("don${apos}t",       "do not")
        $c = $c.Replace("Don${apos}t",       "Do not")
        $c = $c.Replace("doesn${apos}t",     "does not")
        $c = $c.Replace("Doesn${apos}t",     "Does not")
        $c = $c.Replace("didn${apos}t",      "did not")
        $c = $c.Replace("Didn${apos}t",      "Did not")
        $c = $c.Replace("isn${apos}t",       "is not")
        $c = $c.Replace("Isn${apos}t",       "Is not")
        $c = $c.Replace("aren${apos}t",      "are not")
        $c = $c.Replace("Aren${apos}t",      "Are not")
        $c = $c.Replace("wasn${apos}t",      "was not")
        $c = $c.Replace("Wasn${apos}t",      "Was not")
        $c = $c.Replace("weren${apos}t",     "were not")
        $c = $c.Replace("Weren${apos}t",     "Were not")
        $c = $c.Replace("can${apos}t",       "cannot")
        $c = $c.Replace("Can${apos}t",       "Cannot")
        $c = $c.Replace("couldn${apos}t",    "could not")
        $c = $c.Replace("Couldn${apos}t",    "Could not")
        $c = $c.Replace("wouldn${apos}t",    "would not")
        $c = $c.Replace("Wouldn${apos}t",    "Would not")
        $c = $c.Replace("shouldn${apos}t",   "should not")
        $c = $c.Replace("Shouldn${apos}t",   "Should not")
        $c = $c.Replace("haven${apos}t",     "have not")
        $c = $c.Replace("Haven${apos}t",     "Have not")
        $c = $c.Replace("hasn${apos}t",      "has not")
        $c = $c.Replace("Hasn${apos}t",      "Has not")
        $c = $c.Replace("needn${apos}t",     "need not")
        $c = $c.Replace("mustn${apos}t",     "must not")

        $c = $c.Replace("I${apos}m ",        "I am ")
        $c = $c.Replace("I${apos}ve ",       "I have ")
        $c = $c.Replace("I${apos}ll ",       "I will ")
        $c = $c.Replace("I${apos}d ",        "I would ")

        $c = $c.Replace("we${apos}re",       "we are")
        $c = $c.Replace("We${apos}re",       "We are")
        $c = $c.Replace("we${apos}ve",       "we have")
        $c = $c.Replace("We${apos}ve",       "We have")
        $c = $c.Replace("we${apos}ll",       "we will")
        $c = $c.Replace("We${apos}ll",       "We will")
        $c = $c.Replace("we${apos}d",        "we would")
        $c = $c.Replace("We${apos}d",        "We would")

        $c = $c.Replace("you${apos}re",      "you are")
        $c = $c.Replace("You${apos}re",      "You are")
        $c = $c.Replace("you${apos}ve",      "you have")
        $c = $c.Replace("You${apos}ve",      "You have")
        $c = $c.Replace("you${apos}ll",      "you will")
        $c = $c.Replace("You${apos}ll",      "You will")
        $c = $c.Replace("you${apos}d",       "you would")
        $c = $c.Replace("You${apos}d",       "You would")

        $c = $c.Replace("they${apos}re",     "they are")
        $c = $c.Replace("They${apos}re",     "They are")
        $c = $c.Replace("they${apos}ve",     "they have")
        $c = $c.Replace("They${apos}ve",     "They have")
        $c = $c.Replace("they${apos}ll",     "they will")
        $c = $c.Replace("They${apos}ll",     "They will")
        $c = $c.Replace("they${apos}d",      "they would")
        $c = $c.Replace("They${apos}d",      "They would")

        $c = $c.Replace("he${apos}s ",       "he is ")
        $c = $c.Replace("He${apos}s ",       "He is ")
        $c = $c.Replace("she${apos}s ",      "she is ")
        $c = $c.Replace("She${apos}s ",      "She is ")
        $c = $c.Replace("who${apos}s ",      "who is ")
        $c = $c.Replace("Who${apos}s ",      "Who is ")
        $c = $c.Replace("what${apos}s ",     "what is ")
        $c = $c.Replace("What${apos}s ",     "What is ")
        $c = $c.Replace("there${apos}s ",    "there is ")
        $c = $c.Replace("There${apos}s ",    "There is ")
        $c = $c.Replace("that${apos}s ",     "that is ")
        $c = $c.Replace("That${apos}s ",     "That is ")
        $c = $c.Replace("here${apos}s ",     "here is ")
        $c = $c.Replace("Here${apos}s ",     "Here is ")

        $c = $c.Replace("let${apos}s ",      "let us ")
        $c = $c.Replace("Let${apos}s ",      "Let us ")

        $c = $c.Replace("could${apos}ve",    "could have")
        $c = $c.Replace("would${apos}ve",    "would have")
        $c = $c.Replace("should${apos}ve",   "should have")
        $c = $c.Replace("must${apos}ve",     "must have")
    }
    return $c
}

Get-ChildItem -Recurse -Include "*.html" | ForEach-Object {
    $orig = [System.IO.File]::ReadAllText($_.FullName, $u)
    $fixed = Expand $orig
    if ($fixed -ne $orig) {
        [System.IO.File]::WriteAllText($_.FullName, $fixed, $u)
        Write-Host "Fixed: $($_.FullName.Replace((Get-Location).Path+'\',''))"
        $script:changed++
    }
}
Write-Host "Done. $changed file(s) modified."
