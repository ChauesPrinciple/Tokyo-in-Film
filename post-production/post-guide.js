/* Post-Production Decision Making Guide — Scenario Data (H5P 24675) */
initScenario({
  title: 'Post-Production Decision Making Guide',
  subtitle: 'Work through this guide to navigate your post-production process before completing the worksheets below.',
  nodes: [
    {id:0, type:'text', title:'Post-Production Roles Guide',
     content:'<h3>Post-Production Roles</h3><p>In a small student film team of 3&ndash;5 people, roles are simplified to streamline the process while covering all key aspects of post-production. Each team member may take on multiple responsibilities.</p><p><strong>Director</strong></p><ul><li>Oversees the creative vision of the project.</li><li>Provides input and approvals during footage review, editing, sound design, visual effects, and color grading.</li><li>Ensures all decisions align with the narrative and style of the film.</li></ul><p><strong>Editor</strong></p><ul><li>Organizes and reviews all footage to create the rough cut.</li><li>Ensures continuity and narrative flow in the editing process.</li><li>Integrates sound, visual effects, and transitions into the timeline.</li><li>Exports the final cut with proper titles and credits.</li></ul><p><strong>Sound Designer</strong></p><ul><li>Adds and balances sound effects, music, and dialogue.</li><li>Ensures audio quality and synchronization with visuals.</li><li>Works with the Editor to align sound with the film\'s tone.</li></ul><p><strong>VFX Artist (Optional)</strong></p><ul><li>Implements visual effects such as titles, transitions, or special scene enhancements.</li><li>Works with the Editor to ensure seamless integration of effects.</li><li>Handles any necessary motion graphics or overlays.</li></ul><p><strong>Colorist</strong></p><ul><li>Adjusts exposure, contrast, and color balance for visual consistency.</li><li>Collaborates with the Director to apply grading that enhances mood and supports the film\'s style.</li></ul><hr><p><strong>Suggested Team Breakdown</strong></p><p><strong>3-Person Team:</strong> Director/Editor &mdash; Sound Designer &mdash; Colorist/VFX Artist</p><p><strong>4-Person Team:</strong> Director &mdash; Editor &mdash; Sound Designer &mdash; Colorist/VFX Artist</p><p><strong>5-Person Team:</strong> Director &mdash; Editor &mdash; Sound Designer &mdash; VFX Artist &mdash; Colorist</p><hr><p><strong>Tips for Small Teams</strong></p><ul><li><strong>Flexible Roles</strong>: Be prepared to overlap responsibilities as needed.</li><li><strong>Communication</strong>: Regularly review progress as a team to stay aligned.</li><li><strong>Efficiency</strong>: Prioritize key tasks like editing, sound, and grading to meet deadlines.</li></ul>',
     next:1},

    {id:1, type:'branch',
     question:'<p>First and foremost, have you collected all of the footage necessary for the editing process?</p>',
     choices:[
       {text:'Yes.', next:2},
       {text:'No.', next:-1, endMessage:'We cannot move on to post-production until we have finished production! Do not pass go. :('}
     ]},

    {id:2, type:'branch',
     question:'<p>Have all files been renamed or tagged to reflect their content and purpose (e.g., Scene 3, Take 2)? Are there any duplicate or mislabeled files that need to be corrected?</p>',
     choices:[
       {text:'Yes, everything is clearly labeled so that everyone can understand.', next:4},
       {text:'No, we need some ideas.', next:3}
     ]},

    {id:3, type:'video', title:'Organizing Your Project',
     videoId:'nP6W7zJQs_I',
     questions:[],
     next:4},

    {id:4, type:'branch',
     question:'<p>Are there any gaps in the narrative or transitions that feel abrupt or unclear, wherein we might add b-roll or establishing footage?</p>',
     choices:[
       {text:'Yes.', next:5},
       {text:'No, we have all the shots we need.', next:6}
     ]},

    {id:5, type:'video', title:'Story Gaps &mdash; B-Roll Example',
     videoId:'Xtj0nvAGeMw',
     questions:[
       {type:'info',
        text:'This is not asking you to use this site or any other &mdash; it is an example of using B-Roll footage to create movement and to fill in story gaps.'}
     ],
     next:6},

    {id:6, type:'branch',
     question:'<p>Have you considered cutting any shots that do not add value to the scene or disrupt pacing?</p>',
     choices:[
       {text:'Yes, we left them on the cutting room floor; let\'s proceed.', next:8},
       {text:'No. How do I know what to cut?', next:7}
     ]},

    {id:7, type:'text', title:'Editing Guide',
     content:'<p>Editing is an art that balances technical precision with emotional resonance. Here\'s a focused guide to help you make the best decisions during the editing process:</p><h3><strong>1. Review the Script and Notes</strong></h3><ul><li><strong>Provide Context:</strong> Familiarize yourself with the tone, purpose, and intent behind each scene. The script acts as a roadmap.</li><li><strong>Highlight Preferences:</strong> Identify takes favored by the director or flagged for specific considerations, like continuity issues or standout moments.</li><li><strong>Organize Your Workflow:</strong> Use markers, labels, or folders to categorize takes according to scenes, quality, or key elements noted during filming.</li></ul><h3><strong>2. Watch All the Takes</strong></h3><ul><li><strong>Use Split-Screen Tools:</strong> Compare multiple takes side-by-side to spot differences in performance and technical aspects quickly.</li><li><strong>Look for Surprises:</strong> Watch for moments of spontaneity or brilliance that might elevate a scene.</li><li><strong>Avoid Bias:</strong> Stay open-minded and avoid relying solely on initial impressions or production-day notes.</li></ul><h3><strong>3. Focus on Performance</strong></h3><ul><li><strong>Emotional Authenticity:</strong> Choose takes that convey genuine emotion and depth, enhancing the narrative.</li><li><strong>Assess Chemistry:</strong> Pay attention to how actors interact and react to one another.</li><li><strong>Avoid Obvious Errors:</strong> Eliminate takes with noticeable issues like flubbed lines, missed cues, or awkward physicality.</li></ul><h3><strong>4. Consider Technical Aspects</strong></h3><ul><li><strong>Lighting and Framing:</strong> Select takes with consistent and visually pleasing lighting and camera composition.</li><li><strong>Sound Clarity:</strong> Ensure dialogue and background audio are clean and free from interference or distortion.</li><li><strong>Error-Free Visuals:</strong> Avoid takes with visible crew or equipment, reflections, or framing inconsistencies.</li></ul>',
     next:8},

    {id:8, type:'branch',
     question:'<p>Have you reviewed the sound design with the Director for alignment with the creative vision, or are there specific audio elements that need reworking based on feedback?</p>',
     choices:[
       {text:'We got this; keep your advice.', next:10},
       {text:'I love videos. Help please.', next:9}
     ]},

    {id:9, type:'text', title:'Sound Design Guide',
     content:'<p>Sound design is one of the most powerful tools in post-production. Here\'s what to focus on:</p><h3><strong>1. Dialogue Clarity</strong></h3><ul><li>Review all recorded dialogue for background noise, distortion, or inconsistent levels.</li><li>Use noise reduction tools if available, but prioritize clean recordings from the shoot.</li><li>Ensure lip sync is accurate throughout every cut.</li></ul><h3><strong>2. Room Tone and Ambience</strong></h3><ul><li>Add room tone (recorded ambient silence from the location) under all dialogue to fill audio gaps between cuts.</li><li>Layer environmental sounds (city noise, wind, indoor hum) that match each location in your film.</li></ul><h3><strong>3. Sound Effects</strong></h3><ul><li>Add foley or library sound effects that reinforce on-screen actions (footsteps, door closes, etc.).</li><li>Keep effects subtle &mdash; they should support the scene, not distract from it.</li></ul><h3><strong>4. Music</strong></h3><ul><li>Find royalty-free music that matches the emotional tone of your film.</li><li>Fade music in and out gradually. Avoid abrupt cuts in music.</li><li>Keep dialogue scenes music-light so conversations remain clear.</li></ul><h3><strong>5. Final Mix</strong></h3><ul><li>Dialogue should be the loudest element (approx. &minus;12 to &minus;6 dBFS peaks).</li><li>Music and ambience sit lower, filling the space without competing.</li><li>Export your final audio as a stereo mix.</li></ul>',
     next:10},

    {id:10, type:'branch',
     question:'<p>Has the color grading been reviewed with the Director for consistency and to ensure it supports the film\'s mood and style?</p>',
     choices:[
       {text:'Yes, we\'re happy with the look.', next:12},
       {text:'No, we need guidance on color grading.', next:11}
     ]},

    {id:11, type:'text', title:'Color Grading Guide',
     content:'<p>Color grading unifies the visual feel of your film and reinforces its emotional tone. Here\'s a focused approach:</p><h3><strong>1. Exposure and White Balance Correction</strong></h3><ul><li>First, correct any exposure problems so all shots are consistently lit.</li><li>Fix white balance inconsistencies between shots filmed in different conditions (indoor vs. outdoor).</li></ul><h3><strong>2. Match Shots in the Same Scene</strong></h3><ul><li>Every shot in a scene should feel like it was filmed under the same conditions. Match skin tones, shadows, and highlights across cuts.</li><li>Use scopes (waveform, vectorscope) if your editing software provides them.</li></ul><h3><strong>3. Apply a Creative Look</strong></h3><ul><li><strong>Cool, desaturated blues</strong>: Isolation, distance, tension.</li><li><strong>Warm ambers and oranges</strong>: Intimacy, nostalgia, comfort.</li><li><strong>High contrast with crushed blacks</strong>: Thriller, drama, intensity.</li><li><strong>Soft, faded look</strong>: Memory, dream sequences, gentle nostalgia.</li><li>Study the films from our course list &mdash; what color palette does your reference film use?</li></ul><h3><strong>4. Keep It Consistent</strong></h3><ul><li>Apply the same grade (or LUT/preset) to all shots from the same scene.</li><li>Review your full film from start to finish with the grade applied before exporting.</li></ul>',
     next:12},

    {id:12, type:'branch',
     question:'<p>Does your film require any visual effects &mdash; such as titles, transitions, or special scene enhancements?</p>',
     choices:[
       {text:'Yes, we need to add VFX.', next:13},
       {text:'No, we have all the shots we need.', next:14}
     ]},

    {id:13, type:'video', title:'Adding VFX (Optional)',
     videoId:'cNbVl6LCEFI',
     questions:[
       {type:'info',
        text:'Feel free to skip to 1:43 to avoid the ad. He is using the free software Blender.'},
       {type:'tf',
        question:'Do you remember that some models are provided if you don\'t have any &mdash; both Cybercity and Kaiju?',
        correct:true},
       {type:'info',
        text:'The rest of the video does get technical, and you\'re more than welcome to attempt it! However, the basics needed are covered in this section.'}
     ],
     next:14},

    {id:14, type:'branch',
     question:'<p>Do you have a plan to double-check that all titles, credits, and export settings (e.g., resolution, format) are correct for submission requirements?</p>',
     choices:[
       {text:'Yes.', next:-1},
       {text:'Yes. If you were going to say No...', next:-1}
     ]}
  ]
}, 'scenario-post');
