/**
 * FILM 2140 — Quiz 4: Production — Sound and Camera Technique
 *
 * HOW TO USE:
 * 1. Go to https://script.google.com and click "New project".
 * 2. Delete any starter code, then paste this entire file.
 * 3. Click the disk icon to save (name it "FILM 2140 Quiz 4").
 * 4. Click "Run" — approve the permission prompt the first time.
 * 5. Open the "Execution log" — the form URL and edit URL will be printed.
 * 6. The new Form will appear in your Google Drive root.
 * 7. Copy the share link into the corresponding textbook section
 *    (Production / Sound Design + Cinematography — late chapters).
 *
 * Total: 30 points (10 questions × 3 points each).
 * Email collection + Google login required.
 */

function createQuiz4() {
  var form = FormApp.create('FILM 2140 — Quiz 4: Production — Sound and Camera Technique');

  form.setDescription(
    'Production Quiz 2 of 2. Covers sound as co-expressive with image, ' +
    'dual-system recording, sync/slate, room tone, the boom operator, deep focus ' +
    'in Citizen Kane, the Touch of Evil long take, overcranking/undercranking, ' +
    'Steadicam, and The Social Network production figures.\n\n' +
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
    'Q1. The textbook describes sound as "co-expressive" with cinematography. What does this mean?',
    [
      'Sound is recorded at the same time as the image and cannot be changed afterwards',
      'Sound and image each shape how we perceive the other — they work together to create meaning',
      'Sound is subordinate to image; its role is to reinforce what the camera shows',
      'Sound and image are edited separately and only combined at the final mix'
    ],
    1 // B
  );

  // ------- Q2 -------
  addMC(form,
    'Q2. Why do most professional film productions use dual-system recording rather than recording sound directly through the camera?',
    [
      'Cameras do not have microphone inputs',
      'Camera-mounted microphones are omnidirectional and cannot be aimed at actors',
      'Dual-system recording reduces the amount of equipment needed on set',
      'Cameras are designed to record images; dedicated sound equipment with a trained recordist gives far more precise control over audio quality'
    ],
    3 // D
  );

  // ------- Q3 -------
  addMC(form,
    'Q3. Dual-system recording improves sound quality but introduces a new problem. What is that problem, and how is it solved on set?',
    [
      'The problem is background noise; it is solved by recording in a soundproofed studio',
      'The problem is file compatibility; it is solved by using the same recording format for both camera and audio',
      'The problem is synchronization; it is solved by using the slate — aligning the frame where the clapper closes with the audio spike it creates',
      'The problem is microphone placement; it is solved by having the boom operator monitor playback'
    ],
    2 // C
  );

  // ------- Q4 -------
  addMC(form,
    'Q4. What is room tone, and what specific editorial problem does it solve?',
    [
      'Room tone is the music score of a scene; it fills silence during montages',
      'Room tone is the unique ambient sound of a space; it fills audio gaps created when editors cut between takes, preventing jarring dead air',
      'Room tone is a test recording made before the cast arrives to check microphone levels',
      'Room tone is added in post to make interior scenes feel larger'
    ],
    1 // B
  );

  // ------- Q5 -------
  addMC(form,
    'Q5. Which of the following best describes the role of the boom operator?',
    [
      'Monitoring and mixing all audio streams in real time from a recording station',
      'Managing sound equipment logistics and assisting the mixer',
      'Recording room tone and wild sound between takes',
      'Physically positioning a microphone on a long pole as close to actors as possible without entering the camera frame'
    ],
    3 // D
  );

  // ------- Q6 -------
  addMC(form,
    'Q6. Gregg Toland achieved deep focus in Citizen Kane through a specific combination of technical choices. What were they?',
    [
      'A telephoto lens combined with neutral density filters and very slow film stock',
      'A medium focal length with maximum aperture and high-resolution film stock',
      'A wide-angle lens, good lighting, and very fast film stock — keeping foreground, midground, and background all in sharp focus simultaneously',
      'Optical printing to combine separate exposures in post-production'
    ],
    2 // C
  );

  // ------- Q7 -------
  addMC(form,
    'Q7. What is the most famous long take in cinema history according to the textbook, and what makes it remarkable?',
    [
      'The opening of Goodfellas — remarkable for following two characters through a single kitchen',
      'Orson Welles\' opening shot from Touch of Evil (1958) — remarkable because Welles moves through close-ups, medium shots, long shots, crane shots, and tracking shots, directing attention and creating suspense, all without a single cut',
      'The long take from Spectre (2015) — remarkable for being shot entirely in one outdoor location',
      'Kurosawa\'s battle scene from Seven Samurai — identified for its combination of choreography and weather'
    ],
    1 // B
  );

  // ------- Q8 -------
  addMC(form,
    'Q8. What is the difference between overcranking and undercranking, and which creates which effect when played back at normal speed?',
    [
      'Overcranking records fewer frames per second; played back at normal speed it creates fast motion',
      'Overcranking films at a higher frame rate than playback; the result is slow motion; undercranking films at a lower frame rate, which when played at normal speed creates a sped-up, comic effect (as in Keystone Kops films)',
      'Both refer to digital processing techniques; they have nothing to do with the physical camera recording rate',
      'Overcranking overexposes the film; undercranking underexposes; both affect color but not the speed of motion'
    ],
    1 // B
  );

  // ------- Q9 -------
  addMC(form,
    'Q9. What is a Steadicam, and what production advantage do multiple cameras create for editors?',
    [
      'A Steadicam is a harness device that suspends the camera on a floating head, isolating it from the operator\'s walking to achieve smooth tracking shots; multiple cameras guarantee continuity editing because the action is recorded simultaneously from all angles',
      'A Steadicam is a tripod-mounted gyroscopic platform; multiple cameras provide wider angle coverage',
      'A Steadicam is a wireless camera drone system; multiple Steadicams allow filming where crew cannot stand',
      'A Steadicam holds the camera at a fixed height; multiple cameras only speed up production, not editing'
    ],
    0 // A
  );

  // ------- Q10 -------
  addMC(form,
    'Q10. The textbook uses The Social Network (2010) to illustrate the repetitive demands of film production. What specific figures does it cite?',
    [
      'The Social Network had 12 setups, took 5 days, and required 200 takes for its most difficult scene',
      'Fincher required 50 takes of every scene due to its documentary-style aesthetic',
      'The textbook cites a 5-minute scene with 5 setups that took 2 days and 99 takes — meaning Jesse Eisenberg and Rooney Mara performed the entire scene 99 times in a row',
      'The scene took 3 weeks to shoot because of complex lighting setups at a practical location'
    ],
    2 // C
  );

  var publishedUrl = form.getPublishedUrl();
  var editUrl      = form.getEditUrl();
  Logger.log('=== FILM 2140 — Quiz 4 created ===');
  Logger.log('Share this link with students:');
  Logger.log(publishedUrl);
  Logger.log('');
  Logger.log('Edit the form here:');
  Logger.log(editUrl);
}
