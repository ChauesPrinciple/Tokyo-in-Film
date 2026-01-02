/**
 * EMAIL RECEIPT SCRIPT
 * 
 * Instructions:
 * 1. Open your Google Form.
 * 2. Click the 3 dots menu top-right -> Script Editor.
 * 3. Paste this code into the editor.
 * 4. Save the project (e.g., "Email Receipt").
 * 5. In Script Editor, click Triggers (clock icon on left).
 * 6. Add Trigger -> Select function: 'onFormSubmit' -> Event source: 'From form' -> Event type: 'On form submit'.
 * 7. Save and authorize relevant permissions.
 *
 * NOTE: This script assumes you are collecting emails automatically or have a question titled "Email Address".
 */

function onFormSubmit(e) {
    var formResponse = e.response;
    var itemResponses = formResponse.getItemResponses();
    var respondentEmail = formResponse.getRespondentEmail(); // Works if "Collect email addresses" is on

    // If email not collected automatically, try to find a question field
    if (!respondentEmail) {
        for (var i = 0; i < itemResponses.length; i++) {
            var title = itemResponses[i].getItem().getTitle();
            if (title.toLowerCase().includes("email")) {
                respondentEmail = itemResponses[i].getResponse();
                break;
            }
        }
    }

    if (respondentEmail) {
        var subject = "Tokyo in Film - Submission Receipt";
        var body = "Thank you for your submission.\n\nHere is a summary of your responses:\n\n";

        for (var j = 0; j < itemResponses.length; j++) {
            var itemResponse = itemResponses[j];
            body += itemResponse.getItem().getTitle() + ":\n" + itemResponse.getResponse() + "\n\n";
        }

        body += "\nGood luck with your shoot!\n- Tokyo in Film Team";

        MailApp.sendEmail({
            to: respondentEmail,
            subject: subject,
            body: body
        });

        Logger.log("Email sent to " + respondentEmail);
    } else {
        Logger.log("No email found to send receipt.");
    }
}
