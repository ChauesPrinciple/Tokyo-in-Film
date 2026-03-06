/* Pre-Production Decision Making Guide — Scenario Data (H5P 24655) */
initScenario({
  title: 'Pre-Production Decision Making Guide',
  subtitle: 'Work through this guide to plan your pre-production process before completing the worksheets below.',
  nodes: [
    {id:0, type:'text', title:'Film Production Pre-Production Choices',
     content:'<p>You\u2019re about to recreate a scene from one of the films we\u2019ve analyzed in class. Each choice you make\u2014from location to lighting\u2014will shape the scene\u2019s impact. This scenario will help you think through key creative and logistical decisions.</p>',
     next:1},

    {id:1, type:'branch',
     question:'<p>Is your film group recreating an existing scene, creating a new scene inspired by one of the analyzed films, or creating a new creative short film (e.g., a documentary)?</p>',
     choices:[
       {text:'Recreate a Scene', next:2},
       {text:'Create a New Scene (Inspired)', next:2},
       {text:'Create a New Scene (Creative)', next:2}
     ]},

    {id:2, type:'video', title:'Thinking about filming; Plan ahead!',
     videoId:'9tpJkxUW6tI',
     questions:[
       {type:'mc',
        question:'Have you considered the kind of lighting you want, or, at the very least, what you can produce? What about the time of day?',
        options:['Yes.','No.'],
        correct:0},
       {type:'mc',
        question:'While this video is a pretty good representation of what your experience may be like, and what you should plan ahead for \u2014 likewise, we plan for the kind of shot we want to create before we get there via a shot list, storyboarding, etc. Have you considered these details with your team?',
        options:['Yes.','No.'],
        correct:0},
       {type:'info',
        text:'When we have limited resources, or availability, sometimes we have to be more creative with how we create or recreate a shot.'}
     ],
     next:3},

    {id:3, type:'branch',
     question:'<p>You need to choose a filming location that closely matches or adapts the original setting of your scene. Which option best reflects the look and feel of the original?</p>',
     choices:[
       {text:'Authentic Location Match',
        next:4,
        feedback:'<p><em>Example</em>: Choosing Shibuya Crossing for a scene from <em>Jujutsu Kaisen</em>.</p><p>This location will bring authentic Tokyo energy to your scene, but it may require permits and extra time to manage crowds.</p>'},
       {text:'Adapted Location',
        next:4,
        feedback:'<p><em>Example</em>: Filming in a quieter backstreet instead of Shibuya Crossing to minimize crowd control needs.</p><p>A quieter street keeps the urban feel while simplifying logistics, though it may lose the intensity of the original setting.</p>'},
       {text:'Studio or Controlled Setting',
        next:4}
     ]},

    {id:4, type:'video', title:'Team Work makes the Dream Work',
     videoId:'hFFopPPrGiE',
     videoStart:184,
     questions:[
       {type:'info',
        text:'How can you use our classtime / excursions to create content for your film?'},
       {type:'info',
        text:'Solutions do not have to be complicated; with a little creativity, we can create incredible effects with the smallest items.'}
     ],
     next:5},

    {id:5, type:'branch',
     question:'<h3>Have you clearly established and agreed upon the responsibilities for the following roles?</h3><p><strong>Screenwriter:</strong> Drafts the script, focusing on creating strong dialogue and a clear narrative. The script should give everyone a roadmap for the story, characters, and tone.</p><p><strong>Director:</strong> Guides the team to align with the film\u2019s vision. Develops storyboards, leads discussions on style, and ensures each team member\u2019s work aligns with the intended mood.</p><p><strong>Cinematographer:</strong> Collaborates with the director to create a shot list that specifies lighting, framing, and camera movement. Each shot should visually communicate the story\u2019s mood and style.</p><p><strong>Production Designer:</strong> Creates the look and feel of the setting, selecting props, costumes, and locations that bring the story\u2019s world to life.</p><p><strong>Editor:</strong> Plans a post-production workflow, organizes file naming conventions, and prepares templates for later editing stages.</p><hr><p><strong>Suggested Team Breakdown (minimum 3 people)</strong></p><p><strong>3-Person Team:</strong> Director/Screenwriter &mdash; Cinematographer/Production Designer &mdash; Editor</p><p><strong>4-Person Team:</strong> Director &mdash; Screenwriter/Production Designer &mdash; Cinematographer &mdash; Editor</p><p><strong>5-Person Team:</strong> Director &mdash; Screenwriter &mdash; Cinematographer &mdash; Production Designer &mdash; Editor</p><p><strong>Auxiliary roles</strong> (shared as needed): Actor/Cast, Location Scout, Production Assistant, Continuity.</p>',
     choices:[
       {text:'Yes.', next:6},
       {text:'No.', next:5,
        feedback:'<p><strong>Develop Roles</strong> \u2014 Please take time to consider aspects of making your project. Having clearly defined roles, with clearly defined responsibilities, will help everyone succeed.</p><p>Please consider that this pre-production will produce:</p><ul><li><strong>Group Deliverables:</strong> Complete storyboards, shot lists, and a script. These materials will provide a shared vision for each scene.</li><li><strong>Individual Deliverables:</strong> Submit a short reflection on your role in the pre-production process and any insights gained from supporting another team.</li></ul><p>Please proceed to see and distribute / agree to the roles each of you will take in pre-production.</p>'}
     ]},

    {id:6, type:'text', title:'Pre-Production Form',
     content:'<p>Please fill out the following <a href="https://docs.google.com/forms/d/1y7fgcJaJPhJ70Rje1-upH64bZ9L-BORyin_y-HhHM2I/edit" target="_blank"><strong>Pre-Production Form</strong></a> for your group.</p><p>Please ensure that you complete the Google form before proceeding to the worksheets below.</p>',
     next:-1}
  ]
}, 'scenario-pre');
