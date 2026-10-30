/**
 * FILM 2140 — Quiz 1: Narrative, Script, and Genre
 *
 * HOW TO USE:
 * 1. Go to https://script.google.com and click "New project".
 * 2. Delete any starter code, then paste this entire file.
 * 3. Click the disk icon to save (name it "FILM 2140 Quiz 1").
 * 4. Click "Run" — Google will ask for permission the first time
 *    (to create Forms on your Drive). Approve.
 * 5. Open the "Execution log" — the form URL and edit URL will be printed.
 * 6. The new Form will appear in your Google Drive root.
 * 7. Open the form, click "Send", and copy the share link to embed in
 *    the textbook page (Pre-Production / Narrative).
 *
 * BEHAVIOR:
 * - Configured as a Google Forms QUIZ (auto-grades).
 * - Requires the respondent to be signed in to a Google account
 *   AND collects their verified email.
 * - Each question is worth 3 points. Total = 30 points.
 * - Correct answer is marked; students see their score immediately
 *   on submit. You see all responses in Forms → Responses tab,
 *   and can also link a Google Sheet for full gradebook export.
 */

function createQuiz1() {
  var form = FormApp.create('FILM 2140 — Quiz 1: Narrative, Script, and Genre');

  form.setDescription(
    'Pre-Production Quiz 1 of 6. Covers narrative structure, screenplay format, ' +
    'character types, narration, plot vs. theme, and genre.\n\n' +
    'Time: ~10 minutes. Worth 30 points (10 questions × 3 points each).\n\n' +
    'You must be signed in to your school Google account. Your email will be ' +
    'recorded with your submission.'
  );

  // Quiz settings
  form.setIsQuiz(true);
  form.setCollectEmail(true);                  // record verified email
  form.setRequireLogin(true);                  // must be logged in to a Google account
  form.setLimitOneResponsePerUser(true);       // one attempt per student
  form.setShowLinkToRespondAgain(false);
  form.setProgressBar(true);
  form.setShuffleQuestions(false);             // keep textbook order
  form.setAllowResponseEdits(false);
  form.setConfirmationMessage(
    'Submission received. Your score and the answer key will be released after ' +
    'all students have completed the quiz.'
  );

  // Question helper
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
    'Q1. The screenplay is described as a technical document with a rigid format. What is the practical purpose of the rule that one page equals approximately one minute of screen time?',
    [
      'It prevents screenwriters from writing more than 90 pages',
      'It limits the number of scenes a film can contain',
      'It allows producers to look at page count and immediately estimate running time, plan the budget, and schedule the shoot',
      'It ensures that dialogue-heavy scripts are automatically longer than action-heavy ones'
    ],
    2 // C
  );

  // ------- Q2 -------
  addMC(form,
    'Q2. A screenwriter includes a line of action that reads: "He thinks about all the mistakes he has made." Why is this a problem in a screenplay?',
    [
      'It is too short and does not give the actor enough guidance',
      'A screenplay can only instruct on what a camera can see or a microphone can hear — internal thoughts cannot be photographed',
      'The line is too vague to be useful for any department',
      'Emotional states must always be expressed through dialogue, not action lines'
    ],
    1 // B
  );

  // ------- Q3 -------
  addMC(form,
    'Q3. What is a logline, and what four elements does it capture?',
    [
      'A single sentence that captures the protagonist, goal, conflict, and stakes — the "hook" for the story',
      'A one-paragraph synopsis used to pitch a film to studios; it describes the story, cast, budget, and release strategy',
      'The opening line of a screenplay\'s first scene, designed to grab the reader immediately',
      'A brief description of the film\'s theme placed on the title page of the screenplay'
    ],
    0 // A
  );

  // ------- Q4 -------
  addMC(form,
    'Q4. In three-act structure, what is the primary function of Act Two, and what happens at its midpoint?',
    [
      'Act Two introduces the protagonist and their world; the midpoint is when the inciting incident occurs',
      'Act Two is about obstacles — stakes escalate with each confrontation; at the midpoint the protagonist faces a choice between turning back or doubling down, and they double down',
      'Act Two is where the climax occurs; the midpoint is when the protagonist first encounters the antagonist',
      'Act Two resolves all major conflicts; the midpoint marks the protagonist\'s point of victory'
    ],
    1 // B
  );

  // ------- Q5 -------
  addMC(form,
    'Q5. What is the inciting incident, and what specific condition makes it an inciting incident rather than just another event?',
    [
      'Any moment of physical conflict between the protagonist and antagonist',
      'The first scene of the film, establishing the protagonist\'s ordinary world',
      'An event that permanently disrupts the protagonist\'s ordinary world and locks in the story\'s central question — the protagonist cannot simply return to their previous life',
      'The climax of Act Two, where all hope appears to be lost'
    ],
    2 // C
  );

  // ------- Q6 -------
  addMC(form,
    'Q6. Syd Field identified the "midpoint" as a key structural beat. What shift does it mark in the protagonist\'s role?',
    [
      'The protagonist\'s introduction into the story',
      'The protagonist\'s moment of greatest failure',
      'The moment when the theme of the film is first stated explicitly',
      'A shift from reactive to active — the protagonist stops being acted upon and starts driving the story forward'
    ],
    3 // D
  );

  // ------- Q7 -------
  addMC(form,
    'Q7. What is the difference between a round character and a flat character?',
    [
      'Round characters appear in every scene; flat characters appear only in subplots',
      'Round characters have more dialogue than flat characters',
      'Round characters are complex, conflicted, and capable of change; flat characters lack internal complexity and do not change, typically existing only to serve the round characters\' journey',
      'Round characters are always protagonists; flat characters are always antagonists'
    ],
    2 // C
  );

  // ------- Q8 -------
  addMC(form,
    'Q8. What is the difference between restricted narration and omniscient narration in cinema?',
    [
      'Restricted narration uses a voice-over; omniscient narration does not',
      'Restricted narration keeps the camera with the protagonist — we only know what the hero knows; omniscient narration allows the camera to follow any character, giving the audience information the protagonist may not have',
      'Restricted narration is used only in first-person films; omniscient narration is used only in ensemble films',
      'Restricted narration requires a single continuous take; omniscient narration allows cuts between multiple locations'
    ],
    1 // B
  );

  // ------- Q9 -------
  addMC(form,
    'Q9. The textbook distinguishes between plot and theme. Using Star Wars as its example, what is the difference?',
    [
      'Plot is what the film is really about; theme is the sequence of events',
      'Plot and theme are interchangeable terms meaning the same thing',
      'Theme refers only to setting and genre; plot refers to character development',
      'Plot is the sequence of events — what happens; theme is what the film is really saying — the underlying idea that organizes the story'
    ],
    3 // D
  );

  // ------- Q10 -------
  addMC(form,
    'Q10. What is chambara, and how does the textbook describe its relationship to another genre tradition?',
    [
      'A swordplay-action sub-genre of jidai-geki — the Eastern equivalent of the Western; Seven Samurai is cited as an example',
      'A Japanese science-fiction sub-genre inspired by American space westerns',
      'The Japanese term for kaiju films featuring human-sized monsters in urban settings',
      'A romantic genre set during the Edo period, combining period drama with love stories'
    ],
    0 // A
  );

  // Output URLs
  var publishedUrl = form.getPublishedUrl();
  var editUrl      = form.getEditUrl();
  Logger.log('=== FILM 2140 — Quiz 1 created ===');
  Logger.log('Share this link with students:');
  Logger.log(publishedUrl);
  Logger.log('');
  Logger.log('Edit the form here:');
  Logger.log(editUrl);
  Logger.log('');
  Logger.log('Open Forms → Responses to view scores, or click the green ' +
             'Sheets icon to link a Google Sheet for full gradebook export.');
}
