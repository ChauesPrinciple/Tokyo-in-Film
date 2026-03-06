/* Production Decision Making Guide — Scenario Data (H5P 24672) */
initScenario({
  title: 'Production Decision Making Guide',
  subtitle: 'Work through this guide to plan and reflect on your production process before completing the worksheets below.',
  nodes: [
    {id:0, type:'text', title:'Daily Set-Up and Shot Planning',
     content:'<p><strong>Key Decisions</strong>: Camera angles, shot order, lighting setup, sound checks.</p><ul><li><strong>Decision Lead</strong>: <strong>Director</strong>, with input from <strong>Cinematographer</strong>, <strong>Assistant Director (AD)</strong>, and <strong>Sound Technician</strong> (if applicable).</li><li><strong>Supporting Roles</strong>:<ul><li>Cinematographer finalizes camera and lighting setup.</li><li>AD ensures crew readiness and adherence to the schedule.</li></ul></li><li><strong>Collaboration Flow</strong>: The Director and AD start with a briefing, reviewing the storyboard or shot list with the Cinematographer and Sound team to ensure readiness.</li></ul>',
     next:1},

    {id:1, type:'branch',
     question:'<p>Have you chosen (looked up, found on a map, got directions, or viewed the place\'s webpage/excursion information) your proposed filming locations and thought through how you intend to create camera angles, shot order, lighting setup, and sound checks?</p>',
     choices:[
       {text:'Yes. The location is secured, and you\'ve verified it meets your needs.', next:2},
       {text:'No. The location is not secured yet.', next:0, feedback:'<p>Assign a team member to confirm access and prepare an alternative location as a backup.</p>'}
     ]},

    {id:2, type:'branch',
     question:'<p>Does the location align with the scene\'s visual and narrative goals?</p>',
     choices:[
       {text:'Yes: The location matches the mood and visual style of our scene.', next:3},
       {text:'No: The location doesn\'t fully match our vision.', next:3}
     ]},

    {id:3, type:'video', title:'Everyone has a plan until...',
     videoId:'_iUCOSECblQ',
     questions:[
       {type:'mc',
        question:'How can planning before visiting a location improve your shoot?',
        options:['It ensures you capture only what is needed.','It allows for impromptu creativity.','It guarantees high-quality footage.','It eliminates the need for a variety of shots.'],
        correct:0},
       {type:'check',
        question:'The video provides four basic choices for adding variety to your shots. Select any or all that you think you will be able to use in your project to craft a better narrative with the camera:',
        options:['The Push Forward','The Slider Reveal','The Jib','The Orbit']},
       {type:'tf',
        question:'The video demonstrates that adding foreground elements can improve depth in your shots, such as using props or natural objects to enhance movements like the push forward or slider reveal.',
        correct:true},
       {type:'tf',
        question:'<p>I have given thought to how / what I can use as cutaway scenes to add narrative depth to my film.</p><p><em>Common Motifs in Japanese Film and Animation Cutaways: Train Tracks &mdash; transitions, journeys; Train Stations &mdash; departure and connection; Rain &mdash; renewal and melancholy; Rain on Glass &mdash; introspection; Urban Neon Lights &mdash; modernity and isolation; Shoji Screens &mdash; traditional settings and separation; Mountains and Nature &mdash; timeless elements; Seasonal Changes (Cherry Blossoms, Snow) &mdash; impermanence; Cityscapes at Night &mdash; alienation or beauty; Reflections in Water &mdash; duality; Flying Birds &mdash; freedom or transitions; Close-ups of Everyday Objects &mdash; tea cups, shoes, books.</em></p>',
        correct:true},
       {type:'info',
        text:'Even though we are recreating a short scene from an established film, our creation is something new, and we also need to punctuate it with a clear beginning, middle, and end. We want to think of this in the shots we take, and not when we are trying to put them together in post production.'}
     ],
     next:4},

    {id:4, type:'text', title:'Production Checklist',
     content:'<h3><strong>Pre-Shoot Preparations</strong></h3><ol><li><p><strong>Camera and Equipment Check</strong>: Inspect all camera gear including lenses, batteries, memory cards, and backups. Test lighting equipment, reflectors, and stands. Confirm all audio equipment including microphones, boom poles, and recording devices is operational.</p></li><li><p><strong>Shot List and Storyboards</strong>: Review the finalized shot list and confirm it aligns with the storyboard and script. Print or digitize the shot list for easy reference on set.</p></li><li><p><strong>Set Design and Props</strong>: Verify that all props, set decorations, and wardrobe items are in place and ready. Conduct a final walkthrough of the set to confirm readiness.</p></li><li><p><strong>Rehearsals</strong>: Schedule and conduct rehearsals with the cast to refine performances and blocking. Practice camera movements and timing with the crew to ensure smooth execution.</p></li><li><p><strong>Schedule and Call Sheet</strong>: Confirm the day\'s schedule and distribute the call sheet to all cast and crew. Double-check arrival times and special requirements for key personnel.</p></li></ol><hr><h3><strong>During the Shoot</strong></h3><ol><li><p><strong>Camera and Lighting Setup</strong>: Set up the camera and lighting equipment as per the shot requirements. Perform a final test to ensure proper framing, exposure, and focus. Check for consistent lighting between shots to avoid continuity errors.</p></li><li><p><strong>Sound and Audio</strong>: Perform a sound check to ensure audio clarity and minimize background noise. Monitor sound levels continuously during the shoot.</p></li><li><p><strong>Actor Preparation</strong>: Ensure actors are in full wardrobe, makeup, and ready for their scenes. Communicate the scene\'s context and emotional tone to the actors.</p></li><li><p><strong>Shot Execution</strong>: Use the shot list to capture all necessary angles and scenes. Review footage after each take to confirm quality and continuity.</p></li><li><p><strong>Time Management</strong>: Keep track of the schedule and allocate adequate time for each shot. Avoid overruns by setting strict limits for retakes unless absolutely necessary.</p></li><li><p><strong>Crew Communication</strong>: Maintain clear and constant communication using radios or designated signals. Hold brief check-ins between shots to address any concerns or updates.</p></li><li><p><strong>Problem-Solving</strong>: Have contingency plans for technical issues, weather changes, or unexpected delays. Stay adaptable and consult the crew for creative solutions when challenges arise.</p></li></ol>',
     next:5},

    {id:5, type:'branch',
     question:'<p>Have you reviewed the shot list and storyboard for feasibility?</p>',
     choices:[
       {text:'Yes: The shots are achievable with your current resources.', next:6},
       {text:'No: Some shots may require adjustments.', next:7}
     ]},

    {id:6, type:'branch',
     question:'<p>Do your planned shots consider environmental factors (e.g., noise, lighting)?</p>',
     choices:[
       {text:'Yes: External factors are accounted for in the plan.', next:8},
       {text:'No: You haven\'t addressed environmental challenges.', next:6}
     ]},

    {id:7, type:'branch',
     question:'<p>Do your planned shots consider environmental factors (e.g., noise, lighting)?</p>',
     choices:[
       {text:'Yes: External factors are accounted for in the plan.', next:8},
       {text:'No: You haven\'t addressed environmental challenges.', next:5}
     ]},

    {id:8, type:'branch',
     question:'<p>Do you have the necessary equipment (camera, sound, lighting)?</p>',
     choices:[
       {text:'Yes: All required equipment is available and functional.', next:9},
       {text:'No: Some equipment is unavailable or untested.', next:-1, endMessage:'Please secure all required equipment before beginning production. Speak with your professor if needed.'}
     ]},

    {id:9, type:'video', title:'When and What to Cut',
     videoId:'3sXXlFsD1ow',
     questions:[
       {type:'tf',
        question:'If you are struggling with the complexity of your scene / being able to recreate specific aspects of the scene, there may be ways to create a similar effect in a simpler way.',
        correct:true},
       {type:'tf',
        question:'We have considered which &ldquo;scene&rdquo; of our short film is the &ldquo;core&rdquo; of the project, and by identifying the scene with the most meaning have identified the scenes that can be changed or adapted without detracting from the overall film or theme.',
        correct:true},
       {type:'info',
        text:'Consider using expressions and body language to convey meaning, or shortening unnecessary information, especially if your actors are nervous or having a difficult time.'},
       {type:'info',
        text:'How can you use our classtime / excursions to create content for your film?'},
       {type:'info',
        text:'Solutions do not have to be complicated; with a little creativity, we can create incredible effects with the smallest items.'}
     ],
     next:10},

    {id:10, type:'text', title:'Weather Check',
     content:'<h2><a href="https://weather.yahoo.co.jp/weather/" target="_blank">Click Here to Check the Weather!</a></h2><p>Check the weather forecast for your filming location and date. Have a contingency plan ready in case of rain or extreme weather conditions.</p>',
     next:11},

    {id:11, type:'branch',
     question:'<p>If you were previously concerned about the production portion of your project, are you ready to continue?</p>',
     choices:[
       {text:'Yeah, we good.', next:12},
       {text:'Help.', next:-1, endMessage:'<strong>Please ask the professor for help.</strong>'}
     ]},

    {id:12, type:'branch',
     question:'<p>Have you kept track of the schedule and allocated adequate time for each shot, and maintained clear and constant communication using radios or designated signals to address concerns and updates during the shoot?</p>',
     choices:[
       {text:'Yes.', next:-1},
       {text:'No.', next:-1, feedback:'<p>Do not pass go. :(</p>'}
     ]}
  ]
}, 'scenario-prod');
