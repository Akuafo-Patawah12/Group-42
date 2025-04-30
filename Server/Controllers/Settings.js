const User = require("../Models/userSchema")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const MailSender = require("../Utils/MailSender")

exports.updateEmail = async (req, res) => {
    const { userId, newEmail } = req.body;
  
    if (!newEmail || !userId) {
      return res.status(400).json({ error: "Missing userId or newEmail" });
    }
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ error: "User not found" });
  
      // Update email
      user.email = newEmail;
      user.emailVerified = false; // Reset verification status
      await user.save();
  
      // Optionally send a confirmation email
      // sendConfirmationEmail(user.email); <-- implement your email logic
  
      res.status(200).json({ message: "Email updated successfully" });
    } catch (error) {
      console.error("Error updating email:", error);
      res.status(500).json({ error: "Server error" });
    }
  };



  
  

  exports.deleteAccount = async (req, res) => {
    const { userId } = req.body;
  
    if (!userId) return res.status(400).json({ error: "Missing userId" });
  
    try {
      await User.findByIdAndDelete(userId);
  
      // Optionally delete related data, e.g., orders, posts, etc.
      // await Order.deleteMany({ customer_id: userId });
  
      res.status(200).json({ message: "Account deleted successfully." });
    } catch (error) {
      console.error("Delete Account Error:", error);
      res.status(500).json({ error: "Failed to delete account." });
    }
  };

  exports.getUser = async (req, res) => {
    const  userId  = req.user.id; // Assuming you're using middleware to set req.user
  
    if (!userId) return res.status(400).json({ error: "Missing userId" });
  
    try {
      const user = await User.findById(userId).select("email username device_info");
      if (!user) return res.status(404).json({ error: "User not found" });
  
      res.status(200).json(user);
    } catch (error) {
      console.error("Get User Settings Error:", error);
      res.status(500).json({ error: "Failed to fetch user settings." });
    }
  };


  // Route: POST /request-email-change
exports.requestChangeEmail = async (req, res) => {
  try{
  const { newEmail } = req.body;
  console.log(newEmail)
  if (!newEmail) return res.status(400).json({ message: 'New email required' });

  const existing = await User.findOne({ email: newEmail });
  if (existing) return res.status(400).json({ message: 'Email already in use' });

  // Create a token
  const token = jwt.sign(
    { userId: req.user.id, newEmail },
    process.env.JWT_UPDATE_SECRET,
    { expiresIn: '5m' }
  );

  const verificationLink = `http://localhost:5173/L/Settings?token=${token}`;

  // Send email with the verification link
  await MailSender(newEmail, 'Verify Your Email Change', verificationLink);

  res.status(200).json({ message: 'Verification link sent to your new email' });

}catch(error){
   console.log("failed to update email",error)
   res.status(500).json({message:"fail to update email"})
}
};



// Route: GET /verify-email-change
exports.verifyEmailChange = async (req, res) => {
  const { token } = req.body;

  try {
    const { userId, newEmail } = jwt.verify(token, process.env.JWT_UPDATE_SECRET);

    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');
    const emailExist = await User.findOne({email: newEmail})
    if (emailExist) return res.status(401).json("Email already exist")
    user.email = newEmail;
    await user.save();

    res.status(200).json('Email updated successfully!');
  } catch (err) {
    res.status(400).json('Invalid or expired token');
  }
};



const ONE_DAY_MS = 24 * 60 * 60 * 1000;
exports.updateUsername = async (req, res) => {
  try{
  const { newUsername } = req.body;
  if (!newUsername) {
    return res.status(400).json({ message: 'New username is required' });
  }

  const user = await User.findById(req.user.id);

  // Check time since last username change
  if (user.lastUsernameChange && Date.now() - user.lastUsernameChange.getTime() < ONE_DAY_MS) {
    const hoursLeft = Math.ceil((ONE_DAY_MS - (Date.now() - user.lastUsernameChange.getTime())) / (60 * 60 * 1000));
    return res.status(429).json({ message: `You can change your username again in ${hoursLeft} hour(s)` });
  }

  const existingUser = await User.findOne({ username: newUsername });
  if (existingUser) {
    return res.status(400).json({ message: 'Username already in use' });
  }

  user.username = newUsername;
  user.lastUsernameChange = new Date();
  await user.save();

  res.json({ message: 'Username updated successfully' });

}catch(error){
  console.log("failed to update username",error)
}
};


exports.settings_updatePassword = async (req, res) => {
  const { password, newPassword } = req.body;
  try{

  if (!password || !newPassword ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const user = await User.findById(req.user.id);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Current password is incorrect' });
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  await user.save();

  res.json({ message: 'Password updated successfully' });
}catch(error){
   console.log("failed to update password",error)
   res.status(500).json({message:"fail to update password"})
}
}

exports.deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.clearCookie('token'); // If you're using cookies
    res.json({ message: 'Account deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete account' });
  }
};


exports.logoutAllSessions =  async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { device_info: [] });

    res.cookie("refreshToken","",{maxAge:1});  // set the expiring time of the token to 1 second
          

    res.json({ message: 'All devices removed and logged out successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove devices' });
  }
};



  
  