const sendEmail = require("../Utils/SendEmail");

async function contact(req, res) {
    const { name, email, message } = req.body;
  
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Please fill in all fields." });
    }
  
    try {
      await sendEmail({ name, email, message });
      res.status(200).json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
      console.error("Email Error:", error);
      res.status(500).json({ success: false, message: "Failed to send message." });
    }
  };

  module.exports = contact;
