/**
 * FILM 2140 — Quiz 5: Post-Production — Sound Design, Mixing, and Score
 *
 * HOW TO USE:
 * 1. Go to https://script.google.com and click "New project".
 * 2. Delete any starter code, then paste this entire file.
 * 3. Click the disk icon to save (name it "FILM 2140 Quiz 5").
 * 4. Click "Run" — approve the permission prompt the first time.
 * 5. Open the "Execution log" — the form URL and edit URL will be printed.
 * 6. The new Form will appear in your Google Drive root.
 * 7. Copy the share link into the corresponding textbook section
 *    (Post-Production / Sound Design).
 *
 * Total: 30 points (10 questions × 3 points each).
 * Email collection + Google login required.
 */

function createQuiz5() {
  var form = FormApp.create('FILM 2140 — Quiz 5: Post-Production — Sound Design, Mixing, and Score');

  form.setDescription(
    'Post-Production Quiz 1 of 2. Covers ADR, sound editing as creative work, ' +
    'foley, sound continuity, sound bridges, J-cuts and L-cuts, diegetic vs. ' +
    'non-diegetic music, scoring after picture lock, leitmotif, and the sound ' +
    'editor vs. sound mixer distinction.\n\n' +
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
    'Q1. A scene was filmed perfectly, but ambient noise from a construction site ruined the dialogue track. What post-production process solves this, and how does it work?',
    [
      'Foley — actors return to perform physical sound effects in sync with the image',
      'Sound mixing — the mixer filters out the construction noise digitally',
      'ADR — actors return to re-record their lines in a controlled environment, looping the scene until the new performance matches what is on screen',
      'Room tone replacement — the ambient track is swapped with silence'
    ],
    2 // C
  );

  // ------- Q2 -------
  addMC(form,
    'Q2. The textbook says sound editing is "literally more creative" than picture editing. What is the reasoning?',
    [
      'Sound editors have more expensive equipment than picture editors',
      'Sound editors have final cut authority over the film',
      'Picture editors only work with footage that already exists, while sound editors create and gather sounds that were never recorded on set',
      'Sound editing requires more years of training than picture editing'
    ],
    2 // C
  );

  // ------- Q3 -------
  addMC(form,
    'Q3. What is the specific job of a foley artist, and what distinguishes it from the work of the location sound recordist?',
    [
      'Foley artists mix all sound elements at the end of post-production; location recordists create original effects',
      'Foley artists compose the musical score; location recordists handle dialogue',
      'Foley artists only work on animated films; location recordists work exclusively on live action',
      'Foley artists recreate in post-production the sounds not captured on set — footsteps, clothing rustles, object handling — while location recordists focus on capturing clean dialogue during filming'
    ],
    3 // D
  );

  // ------- Q4 -------
  addMC(form,
    'Q4. What does continuity mean in the context of sound editing?',
    [
      'Every sound must be recorded on location to be authentic',
      'The soundscape must match what the audience sees — if the image shows gravel but the track plays hardwood footsteps, the mismatch breaks the audience\'s engagement with the story',
      'Dialogue must be recorded in a single continuous take without any cuts',
      'Music must continue uninterrupted across every scene in the film'
    ],
    1 // B
  );

  // ------- Q5 -------
  addMC(form,
    'Q5. What is a sound bridge, and what editorial goal does it serve?',
    [
      'A sound effect that fills the gap between two scenes of silence',
      'A technique where the audio of one shot overlaps with the adjacent shot, smoothing the transition and maintaining narrative continuity',
      'A music cue that signals a change in location to the audience',
      'An ADR pass recorded to cover the gap between two unusable dialogue takes'
    ],
    1 // B
  );

  // ------- Q6 -------
  addMC(form,
    'Q6. What is the difference between a J-cut and an L-cut?',
    [
      'A J-cut continues the previous shot\'s audio into the next shot; an L-cut brings in the next shot\'s audio before we see it',
      'A J-cut brings the audio of the upcoming shot in before we see it; an L-cut continues the previous shot\'s audio into the next shot',
      'A J-cut is used only for dialogue scenes; an L-cut is used only for music transitions',
      'They are two names for the same technique used in different editing software'
    ],
    1 // B
  );

  // ------- Q7 -------
  addMC(form,
    'Q7. What is the difference between diegetic and non-diegetic music in a film?',
    [
      'Diegetic music is composed for the film; non-diegetic music is pre-existing popular music',
      'Diegetic music is played live on set; non-diegetic music is added in post-production',
      'Diegetic music can be heard by the characters in the film\'s world; non-diegetic music is heard only by the audience',
      'Diegetic music creates tension; non-diegetic music creates relief'
    ],
    2 // C
  );

  // ------- Q8 -------
  addMC(form,
    'Q8. A film score is always recorded after the final picture edit is locked. Why?',
    [
      'Composers are not hired until production is complete',
      'The score must be timed precisely to the rhythm of the finished film — each note tied to a moment on screen — so any change in the edit would require the score to change with it',
      'Musicians need to watch the completed film for inspiration before composing',
      'Recording studios are unavailable during production'
    ],
    1 // B
  );

  // ------- Q9 -------
  addMC(form,
    'Q9. What is a leitmotif, and how does it function in a film score?',
    [
      'A piece of music that plays over the opening credits to establish tone',
      'A musical technique where the tempo slows to signal the emotional climax of a scene',
      'The final musical cue of a film, designed to leave a lasting emotional impression',
      'A recurring musical theme associated with a specific character, object, or idea — it reappears throughout the film as a signature, cueing the audience to associate the music with that element'
    ],
    3 // D
  );

  // ------- Q10 -------
  addMC(form,
    'Q10. What is the distinction between the sound editor and the sound mixer in post-production?',
    [
      'The sound mixer records audio on set; the sound editor supervises all post-production sound',
      'The sound editor assembles all the sound elements — dialogue, effects, foley, score — and the sound mixer then takes those finished elements and balances them so the audience hears exactly what the filmmakers intend from shot to shot and scene to scene',
      'The sound mixer creates foley and ADR; the sound editor assembles the final track',
      'They perform the same job but in different industries — the mixer works in music, the editor works in film'
    ],
    1 // B
  );

  var publishedUrl = form.getPublishedUrl();
  var editUrl      = form.getEditUrl();
  Logger.log('=== FILM 2140 — Quiz 5 created ===');
  Logger.log('Share this link with students:');
  Logger.log(publishedUrl);
  Logger.log('');
  Logger.log('Edit the form here:');
  Logger.log(editUrl);
}
