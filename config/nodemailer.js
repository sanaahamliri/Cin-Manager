const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,  // Use the passed 'to' email address
        subject,  // Use the passed 'subject'
        text  // Use the passed 'text'
    };

    return transporter.sendMail(mailOptions);
};

module.exports = {
    sendEmail
};
