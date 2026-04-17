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
       {text:'Recreate a Scene', next:2,
        feedback:'<p>When recreating an existing scene, your benchmark is the original. Match its framing, pacing, lighting, and tone as closely as your resources allow, and bring a reference image or clip to every pre-production discussion so the team stays aligned.</p>'},
       {text:'Create a New Scene (Inspired)', next:2,
        feedback:'<p>Borrow the source film\'s visual language, but write fresh action and dialogue that fits the characters you can actually cast. Pick two or three specific visual choices from the source you want to honor, and let everything else be yours.</p>'},
       {text:'Create a New Scene (Creative)', next:2,
        feedback:'<p>With no source to match against, your pre-production burden is higher. Your script, storyboard, and shot list are the only place the film exists until you shoot it. Spend extra time on the script, and gather reference films with a similar tone for visual inspiration.</p>'}
     ]},

    {id:2, type:'video', title:'Thinking about filming; Plan ahead!',
     videoId:'9tpJkxUW6tI',
     questions:[
       {type:'tf',
        question:'We have discussed the lighting we want for our scene (or what we can realistically achieve with what we own or can borrow) and the time of day we plan to shoot.',
        correct:true},
       {type:'tf',
        question:'We have started a shot list and storyboard with our team, not just discussed the scene in general terms.',
        correct:true},
       {type:'info',
        text:'When we have limited resources or availability, we sometimes have to be more creative with how we create or recreate a shot. The video demonstrates how far an iPhone and a single light can go when the planning is solid.'}
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
        next:4,
        feedback:'<p><em>Example</em>: Filming in a classroom, hallway, or apartment to replicate an interior scene.</p><p>A controlled environment gives you maximum flexibility over lighting and sound, but requires careful set dressing to avoid looking generic. Think about what props, lighting, and framing choices will sell the location.</p>'}
     ]},

    {id:4, type:'video', title:'Practical Effects',
     videoId:'hFFopPPrGiE',
     videoStart:184,
     questions:[
       {type:'check',
        question:'This team won an Oscar with five people and mostly simple techniques. Consider how to apply that approach to your own project:',
        options:[
          'What effects or transitions in your scene could be achieved with props, lighting, costume, or framing changes instead of digital VFX?',
          'Which shots absolutely need production value, and which can stay simple? Budget your effort for the moments that matter most.',
          'Can class time or excursions double as production time? Scouting, B-roll, and establishing shots captured during regular activities cost nothing extra.'
        ]}
     ],
     next:5},

    {id:5, type:'branch',
     question:'<h3>Have you clearly established and agreed upon the responsibilities for the following roles?</h3><p><strong>Screenwriter:</strong> Drafts the script, focusing on creating strong dialogue and a clear narrative. The script should give everyone a roadmap for the story, characters, and tone.</p><p><strong>Director:</strong> Guides the team to align with the film\u2019s vision. Develops storyboards, leads discussions on style, and ensures each team member\u2019s work aligns with the intended mood.</p><p><strong>Cinematographer:</strong> Collaborates with the director to create a shot list that specifies lighting, framing, and camera movement. Each shot should visually communicate the story\u2019s mood and style.</p><p><strong>Production Designer:</strong> Creates the look and feel of the setting, selecting props, costumes, and locations that bring the story\u2019s world to life.</p><p><strong>Editor:</strong> Plans a post-production workflow, organizes file naming conventions, and prepares templates for later editing stages.</p><hr><p><strong>Suggested Team Breakdown (minimum 3 people)</strong></p><p><strong>3-Person Team:</strong> Director/Screenwriter &mdash; Cinematographer/Production Designer &mdash; Editor</p><p><strong>4-Person Team:</strong> Director &mdash; Screenwriter/Production Designer &mdash; Cinematographer &mdash; Editor</p><p><strong>5-Person Team:</strong> Director &mdash; Screenwriter &mdash; Cinematographer &mdash; Production Designer &mdash; Editor</p><p><strong>Auxiliary roles</strong> (shared as needed): Actor/Cast, Location Scout, Production Assistant, Continuity.</p>',
     choices:[
       {text:'Yes.', next:6},
       {text:'No.', next:6,
        feedback:'<p><strong>Develop Roles Before Submitting the Form</strong> \u2014 Please take time to discuss and agree on responsibilities before filling out the form below. Clearly defined roles with clearly defined responsibilities will help everyone succeed.</p><p>This pre-production will produce:</p><ul><li><strong>Group Deliverables:</strong> Complete storyboards, shot lists, and a script. These materials provide a shared vision for each scene.</li><li><strong>Individual Deliverables:</strong> A short reflection on your role in the pre-production process and any insights gained from supporting another team.</li></ul><p>Record your agreed roles on the Pre-Production Form on the next step.</p>'}
     ]},

    {id:6, type:'text', title:'Pre-Production Form',
     content:'<p>Please fill out the following <a href="https://docs.google.com/forms/d/1y7fgcJaJPhJ70Rje1-upH64bZ9L-BORyin_y-HhHM2I/edit" target="_blank"><strong>Pre-Production Form</strong></a> for your group.</p><p>Please ensure that you complete the Google form before proceeding to the worksheets below.</p>',
     next:-1}
  ]
}, 'scenario-pre');
