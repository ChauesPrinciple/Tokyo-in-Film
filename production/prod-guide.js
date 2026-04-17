/* Production Decision Making Guide — Scenario Data (H5P 24672) */
initScenario({
  title: 'Production Decision Making Guide',
  subtitle: 'Work through this guide to plan and reflect on your production process before completing the worksheets below.',
  nodes: [
    {id:0, type:'text', title:'Daily Set-Up and Shot Planning',
     content:'<p><strong>Key Decisions</strong>: Camera angles, shot order, lighting setup, sound checks.</p><ul><li><strong>Decision Lead</strong>: <strong>Director</strong>, with input from <strong>Cinematographer</strong> and <strong>Assistant Director (AD)</strong> or <strong>Sound Technician</strong> where applicable.</li><li><strong>Supporting Roles</strong>:<ul><li>Cinematographer finalizes camera and lighting setup.</li><li>In a 3-person team, the Director may double as AD; the third member handles sound and continuity.</li></ul></li><li><strong>Collaboration Flow</strong>: Start with a brief team review of the storyboard or shot list before each session. Confirm roles, locations, and equipment before moving to the set.</li></ul><p><strong>Minimum team of 3:</strong> Director &mdash; Cinematographer &mdash; Sound/Continuity. Auxiliary tasks (acting, location management) are shared as needed.</p>',
     next:1},

    {id:1, type:'branch',
     question:'<p>Have you chosen (looked up, found on a map, got directions, or viewed the place\'s webpage/excursion information) your proposed filming locations and thought through how you intend to create camera angles, shot order, lighting setup, and sound checks?</p>',
     choices:[
       {text:'Yes. The location is secured, and you\'ve verified it meets your needs.', next:2},
       {text:'No. The location is not secured yet.', next:1, feedback:'<p><strong>Secure the location first.</strong> Assign one team member to confirm access (permit, hours, group-size limits, any entry fees) and identify a backup location in case of weather or access issues. Come back to this step once confirmed.</p>'}
     ]},

    {id:2, type:'branch',
     question:'<p>Does the location align with the scene\'s visual and narrative goals?</p>',
     choices:[
       {text:'Yes: The location matches the mood and visual style of our scene.', next:3},
       {text:'No: The location doesn\'t fully match our vision.', next:3,
        feedback:'<p><strong>Adapting an Imperfect Location</strong></p><ul><li><strong>Shoot tight.</strong> Close-ups and medium shots hide background elements that break continuity or don\u2019t match the scene. You rarely need to show the full environment.</li><li><strong>Control your frame.</strong> Reposition the camera to exclude problem areas \u2014 a different angle, lower or higher eyeline, or a foreground element can mask what doesn\u2019t work.</li><li><strong>Use lighting to isolate.</strong> A strong key light on your subject draws attention away from the background. Dimming or darkening the background simplifies the visual space.</li><li><strong>Dress what you can.</strong> Move or remove objects, add props, or change what is visible within the frame. Small changes read as larger transformations on camera.</li><li><strong>Revise the shot list.</strong> Some shots from your original list may need to be cut or swapped. Identify which shots are critical to the scene and which can be adapted without losing the story.</li></ul>'}
     ]},

    {id:3, type:'video', title:'Everyone has a plan until...',
     videoId:'_iUCOSECblQ',
     questions:[
       {type:'mc',
        question:'How can planning before visiting a location improve your shoot?',
        options:['It frees you to focus on performance and creativity on set because the logistics are already resolved.','It guarantees high-quality footage regardless of the conditions on the day.','It eliminates the need to capture a variety of shots.','It removes the need to rehearse with your cast beforehand.'],
        correct:0},
       {type:'check',
        question:'The video provides four basic choices for adding variety to your shots. Select any or all that you think you will be able to use in your project to craft a better narrative with the camera:',
        options:['The Push Forward','The Slider Reveal','The Jib','The Orbit']},
       {type:'tf',
        question:'The video demonstrates that adding foreground elements can improve depth in your shots, such as using props or natural objects to enhance movements like the push forward or slider reveal.',
        correct:true},
       {type:'tf',
        question:'<p><strong>Separate reflection (not from the video above):</strong> I have given thought to what I can use as cutaway scenes to add narrative depth specifically to a film set in Japan.</p><p><em>Common Motifs in Japanese Film and Animation Cutaways: Train Tracks &mdash; transitions, journeys; Train Stations &mdash; departure and connection; Rain &mdash; renewal and melancholy; Rain on Glass &mdash; introspection; Urban Neon Lights &mdash; modernity and isolation; Shoji Screens &mdash; traditional settings and separation; Mountains and Nature &mdash; timeless elements; Seasonal Changes (Cherry Blossoms, Snow) &mdash; impermanence; Cityscapes at Night &mdash; alienation or beauty; Reflections in Water &mdash; duality; Flying Birds &mdash; freedom or transitions; Close-ups of Everyday Objects &mdash; tea cups, shoes, books.</em></p>',
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
       {text:'No: You haven\'t addressed environmental challenges.', next:5,
        feedback:'<p><strong>Re-examine your shot list with the environment in mind.</strong> Weather, ambient noise, and available light can force changes to angles, timing, or equipment. Revisit your shot list with those constraints, then return to this step.</p>'}
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

    {id:9, type:'video', title:'Troubleshooting Your Scene',
     videoId:'3sXXlFsD1ow',
     questions:[
       {type:'tf',
        question:'If we are struggling with the complexity of a shot or scene, there is almost always a simpler way to achieve a similar effect.',
        correct:true},
       {type:'tf',
        question:'We have identified the single scene that is the core of our short film, and treat all other scenes as adaptable if resources or time force changes.',
        correct:true},
       {type:'check',
        question:'If a shot or scene on your list is not working, consider these adjustments before the shoot:',
        options:[
          'Replace dialogue-heavy moments with action or reaction shots. Expression and body language often communicate more than a line read by a nervous actor.',
          'Simplify the most technically ambitious shot. A hand-held version of a planned dolly, or a static version of a planned crane, usually reads fine on a 30-second short.',
          'Cut what does not serve the core scene. Runtime is not the goal; every shot should earn its place.'
        ]}
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
       {text:'No.', next:-1, feedback:'<p><strong>Before wrapping up:</strong> Confirm the day’s schedule with your team, assign someone to monitor time on each shot, and establish a clear signal or channel for on-set communication. Falling behind on one shot can cascade through the rest of the day.</p>'}
     ]}
  ]
}, 'scenario-prod');
