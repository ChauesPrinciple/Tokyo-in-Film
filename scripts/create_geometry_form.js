function createGeometryForm() {
    var form = FormApp.create('Geometry Add-On Worksheet');
    form.setDescription('Goal: Add geometric staging to a dialogue scene so the audience can read tension and relationships without defaulting to close-up coverage.');

    // Project Information
    form.addSectionHeaderItem().setTitle('Project Information');
    form.addTextItem().setTitle('Student Name').setRequired(true);
    form.addTextItem().setTitle('Project Title').setRequired(true);
    form.addChoiceItem().setTitle('Current Project Stage')
        .setChoices([
            form.createChoice('Planning'),
            form.createChoice('Shot'),
            form.createChoice('Rough Cut'),
            form.createChoice('Near Final')
        ]).setRequired(true);

    form.addTextItem().setTitle('Scene').setRequired(true);
    form.addTextItem().setTitle('Location').setRequired(true);
    form.addParagraphTextItem().setTitle('Characters in scene (list)').setRequired(true);

    // Step 1: Pick the “Geometry Anchor”
    form.addSectionHeaderItem().setTitle('Step 1: Pick the “Geometry Anchor”')
        .setHelpText('Choose the one thing that must stay readable and will anchor the design.');

    form.addChoiceItem().setTitle('Anchor Type')
        .setChoices([
            form.createChoice('Object'),
            form.createChoice('Exit-Threshold'),
            form.createChoice('Power Seat'),
            form.createChoice('Secret-Witness'),
            form.createChoice('Other')
        ]).setRequired(true);

    form.addTextItem().setTitle('Anchor is:').setRequired(true);

    form.addChoiceItem().setTitle('Where will it sit in the frame?')
        .setChoices([
            form.createChoice('Foreground'),
            form.createChoice('Midground'),
            form.createChoice('Background')
        ]).setRequired(true);

    // Step 2: Build the First Shape
    form.addSectionHeaderItem().setTitle('Step 2: Build the First Shape')
        .setHelpText('Pick one base shape and define its points.');

    form.addChoiceItem().setTitle('Shape 1 Type')
        .setChoices([
            form.createChoice('Triangle'),
            form.createChoice('Square (trap)'),
            form.createChoice('Line (rank)'),
            form.createChoice('Cluster (pressure)')
        ]).setRequired(true);

    form.addTextItem().setTitle('Shape 1 name').setRequired(true);
    form.addTextItem().setTitle('Point A').setRequired(true);
    form.addTextItem().setTitle('Point B').setRequired(true);
    form.addTextItem().setTitle('Point C').setRequired(true);
    form.addTextItem().setTitle('Point D (Optional)');

    form.addTextItem().setTitle('What is the viewer supposed to look at first?').setRequired(true);

    // Step 3: Lock the Frame Rule
    form.addSectionHeaderItem().setTitle('Step 3: Lock the Frame Rule')
        .setHelpText('Geometry only works if the camera rule is stable.');

    form.addChoiceItem().setTitle('Choose one rule')
        .setChoices([
            form.createChoice('Rule 1: Hold a wide or medium-wide until the shape changes.'),
            form.createChoice('Rule 2: No reaction cuts unless a new fact appears.'),
            form.createChoice('Rule 3: Reframe only when a character crosses a boundary (door, corner, table edge).')
        ]).setRequired(true);

    form.addTextItem().setTitle('My rule is (specifics):').setRequired(true);

    // Step 4: Plan the Shape Change
    form.addSectionHeaderItem().setTitle('Step 4: Plan the Shape Change')
        .setHelpText('A geometry scene needs at least one clear transformation.');

    form.addTextItem().setTitle('Trigger: What causes the shape to change?')
        .setHelpText('Example triggers: entry, object handoff, accusation, reveal, someone backing up.')
        .setRequired(true);

    form.addChoiceItem().setTitle('Shape 2 Type')
        .setChoices([
            form.createChoice('Triangle'),
            form.createChoice('Square'),
            form.createChoice('Line'),
            form.createChoice('Cluster')
        ]).setRequired(true);

    form.addCheckboxItem().setTitle('How does Shape 2 differ from Shape 1?')
        .setChoices([
            form.createChoice('Expands (distance increases)'),
            form.createChoice('Compresses (trap forms)'),
            form.createChoice('Rotates (new dominant angle)'),
            form.createChoice('Splits (two vs one)'),
            form.createChoice('Breaks (one point peels off to anchor object)')
        ]).setRequired(true);

    form.addTextItem().setTitle('Describe the new arrangement in one sentence:').setRequired(true);

    // Step 5: Geometry Beat Map
    form.addSectionHeaderItem().setTitle('Step 5: Geometry Beat Map')
        .setHelpText('List the scene as shape beats. Keep it simple and countable.');

    // Beat 1
    form.addChoiceItem().setTitle('Beat 1 (start) - Number of people')
        .setChoices([form.createChoice('1'), form.createChoice('2'), form.createChoice('3'), form.createChoice('4')]);
    form.addTextItem().setTitle('Beat 1 Shape');
    form.addChoiceItem().setTitle('Beat 1 Anchor visible?').setChoices([form.createChoice('Yes'), form.createChoice('No')]);

    // Beat 2
    form.addChoiceItem().setTitle('Beat 2 (pressure rises) - Number of people')
        .setChoices([form.createChoice('1'), form.createChoice('2'), form.createChoice('3'), form.createChoice('4')]);
    form.addTextItem().setTitle('Beat 2 Shape');
    form.addChoiceItem().setTitle('Beat 2 Anchor visible?').setChoices([form.createChoice('Yes'), form.createChoice('No')]);

    // Beat 3
    form.addChoiceItem().setTitle('Beat 3 (peak) - Number of people')
        .setChoices([form.createChoice('1'), form.createChoice('2'), form.createChoice('3'), form.createChoice('4')]);
    form.addTextItem().setTitle('Beat 3 Shape');
    form.addChoiceItem().setTitle('Beat 3 Anchor visible?').setChoices([form.createChoice('Yes'), form.createChoice('No')]);

    // Beat 4
    form.addChoiceItem().setTitle('Beat 4 (release) - Number of people')
        .setChoices([form.createChoice('1'), form.createChoice('2'), form.createChoice('3'), form.createChoice('4')]);
    form.addTextItem().setTitle('Beat 4 Shape');
    form.addChoiceItem().setTitle('Beat 4 Anchor visible?').setChoices([form.createChoice('Yes'), form.createChoice('No')]);

    form.addChoiceItem().setTitle('Are you using the clean "geometry arc" (1 -> 2 -> 3 -> 2 -> 1)?')
        .setChoices([form.createChoice('Yes'), form.createChoice('No')]);

    // Step 6: Blocking Instructions
    form.addSectionHeaderItem().setTitle('Step 6: Blocking Instructions (Concrete Moves Only)')
        .setHelpText('Write the moves that create the shapes. No psychology, just actions.');

    form.addParagraphTextItem().setTitle('Blocking Moves').setRequired(true);

    // Step 7: Composition Checks
    form.addSectionHeaderItem().setTitle('Step 7: Composition Checks');

    form.addTextItem().setTitle('Triangle Check (if applicable): Who is Point A looking at?');
    form.addTextItem().setTitle('Triangle Check: Who is Point B looking at?');
    form.addTextItem().setTitle('Triangle Check: What is the third point (object or person)?');

    form.addTextItem().setTitle('Square Trap Check (if applicable): What frames the trapped character?')
        .setHelpText('Doorway / wall corner / table edge / window / bodies / other');

    form.addChoiceItem().setTitle('Clarity Check: In one wide frame, can we read all points of the shape?')
        .setChoices([form.createChoice('Yes'), form.createChoice('No')]).setRequired(true);

    form.addTextItem().setTitle('If no, what must change?');

    // Final Confirmation
    form.addSectionHeaderItem().setTitle('Final Confirmation');

    form.addParagraphTextItem().setTitle('Fill in the blanks: This scene adds geometry by staging [shape] around [anchor], then changing it to [new shape] when [trigger] happens.')
        .setRequired(true);

    Logger.log('Published URL: ' + form.getPublishedUrl());
    Logger.log('Edit URL: ' + form.getEditUrl());
}
