const path = require('path'); 
const fs = require('fs');
const sgMail = require('@sendgrid/mail');
const { handleAttachmentType } = require('./utils');
require('dotenv').config();

// exit if sendgrid api key is not set
if (!process.env.SENDGRID_API_KEY) {
  console.log('Please set your SENDGRID_API_KEY environment variable');
  process.exit(1);
}

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function addEmailContent(msg, templatePath, text) {
  if (templatePath) {
    // Add HTML content if templatePath is provided
    const emailHTML = fs.readFileSync(templatePath, 'utf-8');
    msg.html = emailHTML;
  } else if (text) {
    // Use text content if HTML is not provided but text is
    msg.text = text;
  }
}

function addAttachment(msg, attachmentPath, attachmentType) {
  if (attachmentPath) {
    const attachmentBuffer = fs.readFileSync(attachmentPath);
    const attachmentBase64 = attachmentBuffer.toString('base64');
    
    const attachmentName = path.basename(attachmentPath);
    
    const attachmentContentType = handleAttachmentType(attachmentType);
    
    msg.attachments = [
      {
        content: attachmentBase64,
        filename: attachmentName,
        type: attachmentContentType,
        disposition: 'attachment',
        contentId: 'myId',
      },
    ];
  }
}

function sendEmail({
  fromEmail,
  fromName,
  subject,
  templatePath,
  attachmentPath,
  attachmentType, 
  emailListPath,
  text,
}) {

  const emails = fs
    .readFileSync(emailListPath, 'utf-8')
    .split('\n')
    .filter((email) => email.trim());

  // Loop through each email and send it
  for (const email of emails) {
    const msg = {
      to: email,
      from: {
        email: fromEmail,
        name: fromName,
      },
      subject: subject,
    };

    addEmailContent(msg, templatePath, text);
    addAttachment(msg, attachmentPath, attachmentType);

    sgMail
      .send(msg)
      .then(() => {
        console.log();
        console.log(`Email sent to ${email}`);
      })
      .catch((error) => {
        console.log();
        console.error(`Error sending email to ${email}:`, error);
      });
  }
}

module.exports = sendEmail;