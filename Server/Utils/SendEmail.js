const nodemailer = require("nodemailer");
require('dotenv').config();

const sendEmail = async ({ name, email, message }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or your preferred service
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.EMAIL,
    subject: "New Contact Message SFGL website",
    html: `
      <h3>New Contact Message</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
