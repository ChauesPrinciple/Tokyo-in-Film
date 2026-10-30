/**
 * FILM 2140 — Quiz 2: Mise-en-Scène and Cinematography Fundamentals
 *
 * HOW TO USE:
 * 1. Go to https://script.google.com and click "New project".
 * 2. Delete any starter code, then paste this entire file.
 * 3. Click the disk icon to save (name it "FILM 2140 Quiz 2").
 * 4. Click "Run" — approve the permission prompt the first time.
 * 5. Open the "Execution log" — the form URL and edit URL will be printed.
 * 6. The new Form will appear in your Google Drive root.
 * 7. Copy the share link into the corresponding textbook page
 *    (Pre-Production / Mise-en-Scène + Cinematography).
 *
 * Total: 30 points (10 questions × 3 points each).
 * Email collection + Google login required.
 */

function createQuiz2() {
  var form = FormApp.create('FILM 2140 — Quiz 2: Mise-en-Scène and Cinematography Fundamentals');

  form.setDescription(
    'Pre-Production Quiz 2 of 6. Covers the four elements of mise-en-scène, ' +
    'set design and decoration, low-key lighting, rule of thirds, costume design, ' +
    'the gaffer, color temperature, focal length, depth of field, and rack focus.\n\n' +
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
    'Q1. Mise-en-scène is broken down into four design elements in the textbook. What are they?',
    [
      'Cinematography, editing, sound, and performance',
      'Script, storyboard, production design, and post-production',
      'Location, props, wardrobe, and camera movement',
      'Setting, character, lighting, and composition'
    ],
    3 // D
  );

  // ------- Q2 -------
  addMC(form,
    'Q2. What is the distinction between set design and set decoration?',
    [
      'Set design refers to the design and construction of the physical space itself; set decoration fills that space with all the specific details — furniture, color, texture, objects — that bring the story alive',
      'Set design happens in pre-production; set decoration happens only after filming is complete',
      'Set design is handled by the director; set decoration is handled by the cinematographer',
      'Set design applies only to studio shoots; set decoration applies only to location shoots'
    ],
    0 // A
  );

  // ------- Q3 -------
  addMC(form,
    'Q3. What defines low-key lighting, and what emotional or visual effect does it typically create?',
    [
      'Low-key lighting uses fewer light fixtures than other setups, making it cheaper to execute',
      'Low-key lighting uses only available natural light, with no artificial sources',
      'Low-key lighting keeps the key light subtle or subordinate to other sources, resulting in a high-contrast image with harsh shadows that typically creates tension, mystery, or menace',
      'Low-key lighting is a flat, evenly lit design used to keep attention on dialogue rather than visual style'
    ],
    2 // C
  );

  // ------- Q4 -------
  addMC(form,
    'Q4. What is the rule of thirds, and where do students encounter it in everyday life?',
    [
      'A scriptwriting guideline that divides a story into three equal acts of the same length',
      'A lighting principle requiring that every subject be lit from three angles simultaneously',
      'An editing rhythm that suggests cutting every third scene at a different pace',
      'A compositional technique that divides the frame into thirds horizontally and vertically — the faint grid visible in most smartphone camera apps applies exactly this rule'
    ],
    3 // D
  );

  // ------- Q5 -------
  addMC(form,
    'Q5. What is the textbook\'s argument about costume design — what is it actually for?',
    [
      'Costume design is primarily about making the actor look attractive so the audience identifies with them',
      'Costume design should be historically or technically accurate above all other considerations',
      'Costume design is about what looks right on a character — fitting the time, place, and personality — and can layer in color or visual motifs to support theme, but the goal is never to make us notice the costume, only to see the character',
      'Costume design is the most important element of mise-en-scène because it is what the audience sees first'
    ],
    2 // C
  );

  // ------- Q6 -------
  addMC(form,
    'Q6. What is the gaffer\'s role, and why must the head of the lighting department specifically be a skilled electrician?',
    [
      'The gaffer heads the lighting department and is a skilled electrician because lights require electricity, which is dangerous on a busy film set with 100 or more crew members running around',
      'The gaffer is responsible for moving camera equipment; they must understand mechanics because they operate the dolly and crane',
      'The gaffer oversees the grip department and coordinates with the key grip on safe equipment placement',
      'The gaffer is the DP\'s direct assistant responsible for translating lighting decisions into workable set-ups'
    ],
    0 // A
  );

  // ------- Q7 -------
  addMC(form,
    'Q7. What is color temperature, how is it measured, and which has a warmer, more orange glow — a tungsten bulb or daylight?',
    [
      'Color temperature is a measure of light intensity in lux; tungsten bulbs produce a cooler, bluer light than daylight',
      'Color temperature is measured in lumens; tungsten produces the same color temperature as daylight but at lower intensity',
      'Color temperature is measured in degrees Kelvin; the higher the Kelvin, the cooler and bluer the light — a tungsten bulb at ~3200K produces a warm orange glow, while daylight at ~5600K is cooler and more neutral',
      'Color temperature is measured in degrees Kelvin; the lower the Kelvin, the cooler the light — so tungsten at 3200K is cooler than daylight at 5600K'
    ],
    2 // C
  );

  // ------- Q8 -------
  addMC(form,
    'Q8. What does focal length determine, and in which direction does the magnification-to-angle relationship run?',
    [
      'Focal length determines the film stock\'s sensitivity to light; longer focal length = higher sensitivity',
      'Focal length determines the depth of field; it is measured in degrees and affects how much of the scene appears sharp',
      'Focal length determines shutter speed; longer focal lengths require faster shutter speeds to avoid motion blur',
      'Focal length — measured in millimeters — determines angle of view and magnification: shorter focal length = wider angle of view and smaller magnification; longer focal length = narrower angle of view and greater magnification'
    ],
    3 // D
  );

  // ------- Q9 -------
  addMC(form,
    'Q9. What is depth of field, and how do a narrow and a wide (deep focus) depth of field differ in their visual effect?',
    [
      'Depth of field is the range of frame sizes available on a given camera; narrow depth uses wide-angle lenses while deep focus uses telephoto lenses',
      'Depth of field is the range of distance in front of the camera in which subjects are in sharp focus; a narrow depth of field isolates the subject by keeping only it sharp while the background blurs; a wide depth of field (deep focus) keeps everything — foreground, subject, and background — equally sharp',
      'Depth of field refers to the number of lighting layers in a scene; deep focus requires three-point lighting while narrow depth requires only one key light',
      'Depth of field describes vertical resolution; narrow depth produces higher contrast images while deep focus produces lower contrast'
    ],
    1 // B
  );

  // ------- Q10 -------
  addMC(form,
    'Q10. What is a rack focus (also called a pull focus), and how does it direct the audience\'s attention?',
    [
      'A rack focus is a fast pan or tilt movement that reorients the camera from one point of interest to another',
      'A rack focus is a technique where the camera physically moves closer to a subject to gradually reveal detail',
      'A rack focus is a camera movement toward or away from the subject — the same as a dolly-in',
      'A rack focus is a deliberate change in the depth of field within a single shot — shifting focus from one subject to another — to direct the audience\'s attention without cutting; a focus puller on set manages this operation'
    ],
    3 // D
  );

  var publishedUrl = form.getPublishedUrl();
  var editUrl      = form.getEditUrl();
  Logger.log('=== FILM 2140 — Quiz 2 created ===');
  Logger.log('Share this link with students:');
  Logger.log(publishedUrl);
  Logger.log('');
  Logger.log('Edit the form here:');
  Logger.log(editUrl);
}
