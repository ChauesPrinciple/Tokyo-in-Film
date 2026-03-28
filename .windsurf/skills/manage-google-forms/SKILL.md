---
description: Create and manage Google Forms for student assignments and contact inquiries
tags: [google-forms, assignments, contact, automation]
---

# Manage Google Forms Skill

## Purpose
Create, configure, and embed Google Forms for student assignments and contact inquiries using Google Apps Script automation.

## Form Types

### 1. Assignment Forms
Embedded in module pages for student submissions:
- Geometry worksheets
- Shot list submissions
- Storyboard uploads
- Reflection assignments

### 2. Contact Forms
Three specialized contact forms:
- **Video & Production Services** - Filming, editing, writing
- **Trip Planning & Guide Services** - Japan itineraries, consultation
- **Tokyo & Partnerships** - Course partnerships, sponsorships

## Google Apps Script Automation

### Location
Scripts are in `scripts/` folder:
- `generate_specialized_forms.js` - Creates 3 contact forms
- `create_geometry_form.js` - Creates geometry worksheet form
- `google_form_handler.js` - Form response handling

### Running Scripts

1. Open [Google Apps Script](https://script.google.com)
2. Create new project
3. Copy script content
4. Click **Run**
5. Grant permissions when prompted
6. Copy generated form URLs from execution log

## Creating Contact Forms

### Step 1: Generate Forms
```javascript
// Use scripts/generate_specialized_forms.js
// Creates 3 forms with conditional branching
```

### Step 2: Update Website
Replace placeholder URLs in contact pages:
```html
<a href="FORM_URL_HERE" class="contact-btn" target="_blank">
  Contact Button Text
</a>
```

### Step 3: Configure Settings
In Google Forms settings:
- ✅ Collect email addresses
- ✅ Send respondent copy of response
- ✅ Show progress bar
- Set confirmation message

### Step 4: Enable Notifications
1. Open form → Responses tab
2. Three dots menu → Get email notifications

## Creating Assignment Forms

### Standard Assignment Form Structure
```javascript
{
  title: "Assignment Name",
  description: "Instructions",
  fields: [
    {type: "text", question: "Name", required: true},
    {type: "email", question: "Email", required: true},
    {type: "paragraph", question: "Response", required: true},
    {type: "file", question: "Upload", required: false}
  ]
}
```

### File Upload Forms
For assignments requiring file submissions:
1. Enable file uploads in form settings
2. Specify allowed file types
3. Set file size limits
4. Configure Google Drive storage location

## Embedding Forms in Module Pages

### Inline Embed
```html
<div class="form-embed-container">
  <iframe src="https://docs.google.com/forms/d/e/FORM_ID/viewform?embedded=true"
          width="100%" height="800" frameborder="0">
    Loading…
  </iframe>
</div>
```

### Link to Form
```html
<a href="https://forms.gle/FORM_ID" target="_blank" class="form-link">
  Complete Assignment Form
</a>
```

## Form Response Management

### Viewing Responses
1. Open form in Google Forms
2. Click **Responses** tab
3. View summary or individual responses
4. Export to Google Sheets for analysis

### Automated Processing
Use Google Apps Script to:
- Send confirmation emails
- Create response receipts
- Organize submissions by date/student
- Generate grade reports

Example from `google_form_handler.js`:
```javascript
function onFormSubmit(e) {
  var response = e.response;
  var email = response.getRespondentEmail();
  // Process response...
}
```

## Conditional Branching

### Section-Based Routing
For complex forms with different paths:
1. Create sections in Google Forms
2. Add multiple choice questions
3. Set "Go to section based on answer"
4. Map each answer to appropriate section

Example: Contact form routes by location
- Japan → Partnership options
- Nashville → Local services
- Other → Remote/travel options

## Best Practices

### Form Design
- Keep forms concise (5-10 questions max)
- Use clear, specific question text
- Provide help text for complex questions
- Group related questions in sections
- Use appropriate field types

### Validation
- Require email validation for contact info
- Set character limits on text fields
- Use dropdown/multiple choice for standardized answers
- Make only essential fields required

### User Experience
- Show progress bar for multi-section forms
- Provide confirmation message
- Send respondent copy of submission
- Keep mobile users in mind (test on phone)

## Common Issues

### Form not submitting
- Check required fields are filled
- Verify file upload size limits
- Test with different browsers
- Check form permissions (public access)

### Embed not displaying
- Verify iframe src URL is correct
- Check embed height is sufficient
- Ensure parent page allows iframes
- Test on different devices

### Responses not received
- Check email notifications are enabled
- Verify form is set to accept responses
- Check spam folder for notifications
- Ensure response destination is configured

## Reference Documentation
- `GOOGLE_FORM_SETUP.md` - Detailed contact form setup
- `FORMS_STRATEGY.md` - 3-form system strategy
- `scripts/generate_specialized_forms.js` - Automation script

## Related Skills
- **update-module-content** - Embedding forms in module pages
- **deploy-site** - Deploying form updates to live site
