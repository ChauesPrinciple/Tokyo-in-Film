/**
 * FILM 2140 — Quiz 6: Post-Production — Editing and Animated Films
 *
 * HOW TO USE:
 * 1. Go to https://script.google.com and click "New project".
 * 2. Delete any starter code, then paste this entire file.
 * 3. Click the disk icon to save (name it "FILM 2140 Quiz 6").
 * 4. Click "Run" — approve the permission prompt the first time.
 * 5. Open the "Execution log" — the form URL and edit URL will be printed.
 * 6. The new Form will appear in your Google Drive root.
 * 7. Copy the share link into the corresponding textbook section
 *    (Post-Production / Editing + Animated Films).
 *
 * Total: 30 points (10 questions × 3 points each).
 * Email collection + Google login required.
 */

function createQuiz6() {
  var form = FormApp.create('FILM 2140 — Quiz 6: Post-Production — Editing and Animated Films');

  form.setDescription(
    'Post-Production Quiz 2 of 2. Covers core editing concepts and terms — the ' +
    '"film made three times" principle, the Kuleshov effect, ellipsis, invisible ' +
    '(continuity) editing, the 180-degree rule, the jump cut, and cutting-on-action ' +
    '— plus core animation concepts: persistence of vision, flap sync, and the ' +
    'three principles for evaluating special effects.\n\n' +
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
    'Q1. The textbook says "a film is made three times." Who makes it each time, and why is this a useful way to think about the editor\'s contribution?',
    [
      'First by the producer, second by the director, third by the distributor',
      'First by the screenwriter (as a blueprint), second by the director and crew (as shots), and third by the editor assembling the footage into a coherent story — showing that editing is a full creative act, not just assembly',
      'First in pre-production, second in production, third in post-production marketing',
      'First as an original idea, second as a first cut, third as the final theatrical release'
    ],
    1 // B
  );

  // ------- Q2 -------
  addMC(form,
    'Q2. What did Lev Kuleshov\'s 1918 experiment demonstrate?',
    [
      'Audiences accept discontinuous editing if the emotional tone of each shot is consistent',
      'Color footage produces stronger emotional responses than black-and-white footage',
      'Audiences prefer longer, slower edits to quick cutting in emotionally intense scenes',
      'Audiences project meaning and emotion onto an actor\'s face based on the shot placed next to it — the same neutral expression was read as hunger, grief, or desire depending on what followed it'
    ],
    3 // D
  );

  // ------- Q3 -------
  addMC(form,
    'Q3. What is an ellipsis in editing, and why does the textbook describe it as "crucial to telling a story cinematically"?',
    [
      'A slow dissolve between two scenes that signals the passage of many years',
      'An edit that removes time or events the audience does not need to follow the story — without it, a film would have to show every moment in every character\'s experience, making films unwatchably long',
      'A match cut linking two scenes in different time periods through a shared visual element',
      'A voice-over technique used to explain events that cannot be shown on screen'
    ],
    1 // B
  );

  // ------- Q4 -------
  addMC(form,
    'Q4. Continuity editing is also called "invisible editing." What is the goal that justifies both names?',
    [
      'Matching action perfectly across cuts so the physics of the scene are always consistent',
      'Keeping dialogue consistent between different takes of the same scene',
      'Minimizing the total number of cuts in a film, since fewer cuts are harder to detect',
      'Drawing the viewer into the cinematic experience without ever reminding them they are watching a movie — the editing should be unnoticed, creating a seamless flow of images and sound'
    ],
    3 // D
  );

  // ------- Q5 -------
  addMC(form,
    'Q5. What is the 180-degree rule, what does "jumping the line" mean, and what is the one legitimate reason to break it?',
    [
      'The rule defines an axis of action that the camera must not cross; crossing it reverses subjects\' positions so they no longer appear to look at each other; an editor can deliberately break it to disorient the viewer, or use a new master shot to reorient the axis',
      'The rule requires the camera to always remain exactly 180 degrees from the subject; jumping the line means placing the camera behind the subject',
      'The rule requires cameras to be placed 180 degrees apart on all coverage setups; breaking it creates a Dutch angle',
      'The rule restricts camera movement to horizontal panning only; jumping the line means tilting the camera vertically'
    ],
    0 // A
  );

  // ------- Q6 -------
  addMC(form,
    'Q6. What is a jump cut, and what two very different effects can it produce depending on how it is used?',
    [
      'A jump cut is a cut between two different subjects in the same location; it can produce confusion or surprise',
      'A jump cut is any edit that occurs during a character\'s movement; it can be used to speed up or slow down apparent motion',
      'A jump cut is a cut between two shots of the same subject with little or no variation in framing; it can be used for comedic effect (showing the passage of time) or to dramatize chaos, disorientation, and fractured states of mind',
      'A jump cut is a cut that violates the 180-degree rule; it can produce spatial confusion or deliberate disorientation'
    ],
    2 // C
  );

  // ------- Q7 -------
  addMC(form,
    'Q7. What is persistence of vision, the perceptual phenomenon that makes moving-image media possible?',
    [
      'The tendency of audiences to accept continuity errors in fast-paced sequences; it activates above 48 fps',
      'The name for afterimages that linger on the retina after exposure to bright light',
      'A purely retinal phenomenon definitively proven by Peter Mark Roget in the 19th century',
      'The optical phenomenon where the brain interprets multiple still images as one continuous moving image; the human eye and brain process about 12 separate images per second, retaining each image for roughly 1/16 of a second — if a new image replaces it within that window, the illusion of continuity is created'
    ],
    3 // D
  );

  // ------- Q8 -------
  addMC(form,
    'Q8. How does cutting-on-action hide an edit, and why does it work?',
    [
      'It works by cutting during a moment of silence so the audience\'s attention is on the soundtrack, not the image',
      'The cut is placed in the middle of a physical action — the viewer\'s eyes track the movement of the character rather than registering the cut itself, making the edit feel like one continuous moment even when the two shots are from radically different camera positions',
      'It works by using a visual dissolve to blend the end of one action into the beginning of the next',
      'It works by cutting only when both shots contain identical framing, so the viewer cannot perceive the transition'
    ],
    1 // B
  );

  // ------- Q9 -------
  addMC(form,
    'Q9. What is flap sync, and what challenge does it create for sound design?',
    [
      'A technique where animators exaggerate mouth movements so they are easier to dub into other languages',
      'A term for synchronizing musical scores to specific animated action sequences',
      'The requirement that dubbed performances match the existing lip movements in the animation — this constraint affects how the voice sits in the mix, limiting choices around EQ, spatial placement, and emotional delivery',
      'A post-production process that adjusts frame rate to match voice performance timing'
    ],
    2 // C
  );

  // ------- Q10 -------
  addMC(form,
    'Q10. The textbook proposes three principles for evaluating whether special effects "worked" in a given film. What are they?',
    [
      'Accuracy, Speed, and Budget',
      'Realism, Originality, and Complexity',
      'Photorealism, Consistency, and Audience Surprise',
      'Believability (effects integrate seamlessly with live-action), Emotional Impact (effects serve the narrative and enhance emotional resonance), and Technical Execution (effects are technically sound, avoiding distracting flaws)'
    ],
    3 // D
  );

  var publishedUrl = form.getPublishedUrl();
  var editUrl      = form.getEditUrl();
  Logger.log('=== FILM 2140 — Quiz 6 created ===');
  Logger.log('Share this link with students:');
  Logger.log(publishedUrl);
  Logger.log('');
  Logger.log('Edit the form here:');
  Logger.log(editUrl);
}
