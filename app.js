#!/usr/bin/env node

const { Command } = require('commander');
const sendEmail = require('./sendEmail');
const program = new Command();

program
    .name('node-sendgrid-emailer')
    .description('CLI to send HTML email to a list of recipients')
    .version('0.0.1');

program.command('send')
    .description('Send email to a list of recipients')

program
    .option('-h, --html <htmlEmailPath>', 'HTML template path')
    .option('-e, --email-list <emailListPath>', 'Email list file path')
    .option('-n, --name <fromName>', 'Sender name')
    .option('-s, --subject <subject>', 'Email subject')
    .option('-a, --attachment <attachmentPath>', 'Attachment file path')
    .option('-f, --from <fromEmail>', 'Sender email address')
    .option('-t, --text <emailText>', 'Email text')

program.parse(process.argv)

console.log(program.opts()) 

// handle no email list path
if (!program.opts().emailList) {
    console.log('Please provide an email list path')
    program.help()
    process.exit(1)
}

// handle no sender name
if (!program.opts().name) {
    console.log('Please provide a sender name')
    program.help()
    process.exit(1)
}

// handle no email subject
if (!program.opts().subject) {
    console.log('Please provide an email subject')
    program.help()
    process.exit(1)
}

// handle no sender email
if (!program.opts().from) {
    console.log('Please provide a sender email')
    program.help()
    process.exit(1)
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

