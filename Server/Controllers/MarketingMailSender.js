
const nodemailer = require("nodemailer");
const marketingMailSender = async (req, res) => {
    const { email, message ,marketer_email } = req.body;
    console.log(email, message ,marketer_email)
  
    if (!email || !message) {
      return res.status(400).json({ error: "Email and message are required." });
    }
  
    try {
      // Create a transporter
      const transporter = nodemailer.createTransport({
        service: "Gmail", // or use 'hotmail', 'yahoo', etc. or configure with host/port
        auth: {
          user: process.env.EMAIL, // your Gmail address
          pass: process.env.PASSWORD, // your Gmail app password (not your login password)
        },
      });
  
      // Email options
      const mailOptions = {
        from: email,
        to: marketer_email, // receiving email (usually same as your email)
        subject: "New Message from SFGL website",
        html: `
          <h3>Contact Form Submission</h3>
          <p><strong>From:</strong> ${email}</p>
          <p><strong>Message:</strong><br/>${message}</p>
        `,
      };
  
      // Send email
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ success: true, message: "Message sent successfully!" });
    } catch (err) {
      console.error("Error sending email:", err);
      res.status(500).json({ error: "Failed to send message." });
    }
  };


  module.exports= marketingMailSender;
  