const nodemailer = require('nodemailer');

async function MailSender(to, subject, text) {
  try{
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `Your App <${process.env.EMAIL}>`,
    to,
    subject,
    html: `<a href="${text}" target="_blank" rel="noopener noreferrer">Email verification link</a>`,
  });
}catch(err){
  console.log(error)
}
}

module.exports = MailSender;