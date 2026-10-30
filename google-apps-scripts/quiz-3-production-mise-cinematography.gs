/**
 * FILM 2140 — Quiz 3: Production — Mise-en-Scène and Cinematography On Set
 *
 * HOW TO USE:
 * 1. Go to https://script.google.com and click "New project".
 * 2. Delete any starter code, then paste this entire file.
 * 3. Click the disk icon to save (name it "FILM 2140 Quiz 3").
 * 4. Click "Run" — approve the permission prompt the first time.
 * 5. Open the "Execution log" — the form URL and edit URL will be printed.
 * 6. The new Form will appear in your Google Drive root.
 * 7. Copy the share link into the corresponding textbook section
 *    (Production / Mise-en-Scène + Cinematography On Set).
 *
 * Total: 30 points (10 questions × 3 points each).
 * Email collection + Google login required.
 */

function createQuiz3() {
  var form = FormApp.create('FILM 2140 — Quiz 3: Production — Mise-en-Scène and Cinematography On Set');

  form.setDescription(
    'Production Quiz 1 of 2. Covers acting for the camera (close-ups, naturalism, ' +
    'classical vs. Method), German Expressionism, komorebi, aspect ratio, triangle ' +
    'composition, Wes Anderson + Kubrick symmetry, motivated camera movement, and ' +
    'camera angles.\n\n' +
    'Time: ~10 minutes. Worth 30 points (10 questions × 3 points each).\n\n' +
    'You must be signed in to your school Google account. Your email will be ' +
    'recorded with your submission.'
  );

  form.setIsQuiz(true);
  form.setCollectEmail(true);
  form.setRequireLogin(true);
  form.setLimitOneResponsePerUser(true);
  form.setShowLinkToRespondAgain(false);
  form.setProgressBar(true);
  form.setShuffleQuestions(false);
  form.setAllowResponseEdits(false);
  form.setConfirmationMessage(
    'Submission received. Your score and the answer key will be released after ' +
    'all students have completed the quiz.'
  );

  function addMC(form, questionText, options, correctIndex) {
    var item = form.addMultipleChoiceItem();
    item.setTitle(questionText);
    item.setPoints(3);
    item.setRequired(true);
    var choices = options.map(function (text, i) {
      return item.createChoice(text, i === correctIndex);
    });
    item.setChoices(choices);
  }

  // ------- Q1 -------
  addMC(form,
    'Q1. The textbook says the close-up "changed everything" for screen acting. What specifically changed?',
    [
      'Actors no longer needed to memorize lines because they could read cue cards off-camera',
      'The close-up forced actors to abandon theatrical training entirely',
      'Because the camera could capture the smallest facial detail, the exaggerated gestures needed for stage performance became unnecessary — a raised eyebrow or a quick glance could communicate as much as a dramatic monologue',
      'Close-ups allowed directors to cast non-professional actors since emotional expression was no longer required'
    ],
    2 // C
  );

  // ------- Q2 -------
  addMC(form,
    'Q2. How does the textbook describe the defining quality of good screen acting?',
    [
      'Good acting involves technically precise execution of every planned gesture and line reading',
      'Good acting prioritizes emotional intensity over technical control',
      'Good acting requires the actor to match the emotional tone of the director\'s stated vision',
      'Good acting does not look like acting at all — achieving that naturalism is the hardest part'
    ],
    3 // D
  );

  // ------- Q3 -------
  addMC(form,
    'Q3. What is the core difference between classical acting and Method Acting?',
    [
      'Classical acting is used only in musicals; Method Acting is used only in dramatic films',
      'Classical acting focuses on external expression through precise control of the body and voice — trusting the text; Method Acting focuses on internal emotional truth — drawing on the actor\'s own experiences to fuel the performance',
      'Classical acting requires formal conservatory training; Method Acting requires no training at all',
      'Classical acting is used for comedy; Method Acting is used for tragedy'
    ],
    1 // B
  );

  // ------- Q4 -------
  addMC(form,
    'Q4. What were the defining characteristics of German Expressionism as a cinematic movement, and what direct influence did it have on later filmmaking?',
    [
      'German Expressionism pushed set design into surreal, painted exaggeration with deep shadow and almost no fill; German filmmakers who emigrated to Hollywood in the 1930s built the classic American horror film on that Expressionist foundation',
      'German Expressionism used handheld cameras and non-professional actors; its influence is seen in Italian Neorealism',
      'German Expressionism is defined by flat lighting and static camera work; its influence is seen in Ozu\'s Japanese cinema',
      'German Expressionism was primarily a style of acting rather than visual design'
    ],
    0 // A
  );

  // ------- Q5 -------
  addMC(form,
    'Q5. What is komorebi, and how does the textbook say it functions in Studio Ghibli\'s visual style?',
    [
      'A Japanese narrative structure built on gradually escalating emotional tension',
      'The Japanese term for negative space, equivalent to ma, used to create silence in a composition',
      'The hand-drawn quality of traditional animation, as opposed to digitally generated imagery',
      'The dappled light filtering through trees; Ghibli uses it as a specific lighting technique to create a dream-like atmosphere distinct to their storytelling style'
    ],
    3 // D
  );

  // ------- Q6 -------
  addMC(form,
    'Q6. What is aspect ratio, what is the current cinema standard, and what earlier standard does the textbook call the "academy ratio"?',
    [
      'Aspect ratio is the number of frames per second; the current standard is 48fps; the academy ratio was 24fps',
      'Aspect ratio is the width of the frame relative to its height; the current standard is 16:9 (1.78:1); the earlier standard, much closer to a square, was 4:3, called the academy ratio',
      'Aspect ratio is the ratio of color information to luminance in a digital image; the current standard is 4:2:2',
      'Aspect ratio is the ratio of resolution to frame rate; 16:9 is the standard; the academy ratio was the 35mm film standard'
    ],
    1 // B
  );

  // ------- Q7 -------
  addMC(form,
    'Q7. The textbook describes the storytelling effect of triangle composition. What does a stable triangle (wide base at bottom) communicate, and what does an inverted triangle communicate?',
    [
      'A stable triangle feels grounded and authoritative (a hero framed this way feels solid); an inverted triangle feels precarious and tense (a villain framed this way feels dangerous) — same subject, different geometry, different story',
      'A stable triangle communicates chaos and energy; an inverted triangle communicates calm and resolution',
      'A stable triangle draws the eye toward the background; an inverted triangle draws the eye toward the foreground',
      'Both orientations communicate the same thing; meaning comes from the colors within the triangular area, not its orientation'
    ],
    0 // A
  );

  // ------- Q8 -------
  addMC(form,
    'Q8. What is Wes Anderson\'s signature compositional approach, and what director does the textbook identify as using the same principle to create dread?',
    [
      'Wes Anderson uses chaotic, asymmetric framing; Stanley Kubrick used symmetry for warmth',
      'Wes Anderson uses the quadrant system; Kubrick used the rule of thirds to create unease',
      'Wes Anderson uses deep-focus wide-angle compositions; Kubrick used shallow-focus telephoto compositions',
      'Wes Anderson has an apparent obsession with symmetry, making it a defining element of his Mise-en-Scène; Stanley Kubrick also used rigid symmetry — in The Shining and 2001 — but to create a sense of control that made every disruption feel threatening'
    ],
    3 // D
  );

  // ------- Q9 -------
  addMC(form,
    'Q9. What is the principle of motivated camera movement, and what problem does unmotivated movement create?',
    [
      'Motivated movement refers to movement driven by real-time events on set; unmotivated movement is pre-planned in storyboards',
      'A motivated camera move serves the story; an unmotivated move (moving just because it "looks cool") becomes visible rather than invisible, reminding viewers they are watching a movie',
      'Motivated movement must follow a character; unmotivated movement is any crane or aerial shot that does not follow a specific subject',
      'Unmotivated movement is only problematic in dialogue scenes; in action sequences audiences expect it'
    ],
    1 // B
  );

  // ------- Q10 -------
  addMC(form,
    'Q10. The textbook identifies four camera angle types. Which option correctly matches all four to their psychological/narrative effect?',
    [
      'High angle = dominance; low angle = smallness; eye-level = drama; Dutch angle = normalcy',
      'High angle = mystery; low angle = vulnerability; eye-level = power; Dutch angle = spatial disorientation',
      'High angle = smallness and submissiveness; low angle = superiority and dominance; eye-level = confidence, comfort, and normalcy; Dutch/canted angle = drama, panic, or psychological disturbance',
      'High angle and low angle both create dominance; eye-level is neutral; Dutch angle creates slow-motion effects'
    ],
    2 // C
  );

  var publishedUrl = form.getPublishedUrl();
  var editUrl      = form.getEditUrl();
  Logger.log('=== FILM 2140 — Quiz 3 created ===');
  Logger.log('Share this link with students:');
  Logger.log(publishedUrl);
  Logger.log('');
  Logger.log('Edit the form here:');
  Logger.log(editUrl);
}
