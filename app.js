#!/usr/bin/env node

const { Command } = require('commander');
const sendEmail = require('./sendEmail');
const { isEmailValid } = require('./utils');

const program = new Command();

program
  .name('node-sendgrid-emailer')
  .description('CLI to send HTML email to a list of recipients')
  .version('0.0.1');

program.command('send').description('Send email to a list of recipients');

program
  .option('-h, --html <htmlEmailPath>', 'HTML template path')
  .option('-e, --email-list <emailListPath>', 'Email list file path')
  .option('-n, --name <fromName>', 'Sender name')
  .option('-s, --subject <subject>', 'Email subject')
  .option('-a, --attachment <attachmentPath>', 'Attachment file path')
  .option('-f, --from <fromEmail>', 'Sender email address')
  .option('-t, --text <emailText>', 'Email text');

program.parse(process.argv);

console.log(program.opts());

try {
  // handle no email list path
  if (!program.opts().emailList) {
    throw new Error('Please provide an email list path');
  }

  // handle no sender name
  if (!program.opts().name) {
    throw new Error('Please provide a sender name');
  }

  // handle no email subject
  if (!program.opts().subject) {
    throw new Error('Please provide an email subject');
  }

  // handle no sender email
  if (!program.opts().from) {
    throw new Error('Please provide a sender email');
  }

  // check if email is valid
  if (!isEmailValid(program.opts().from)) {
    throw new Error('Please provide a valid sender email');
  }

  sendEmail({
    fromEmail: program.opts().from,
    fromName: program.opts().name,
    subject: program.opts().subject,
    templatePath: program.opts().html,
    text: program.opts().text,
    attachmentPath: program.opts().attachment,
    emailListPath: program.opts().emailList,
  });
  
} catch (error) {
  console.error(error.message);
  program.help();
  process.exit(1);
}

