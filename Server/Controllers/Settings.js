const User = require("../Models/userSchema")
const bcrypt = require("bcrypt");

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


  exports.settings_updatePassword = async (req, res) => {
    const { userId, password, newPassword } = req.body;
  
    if (!userId || !password || !newPassword) {
      return res.status(400).json({ error: "All fields are required." });
    }
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ error: "User not found." });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Current password is incorrect." });
      }
  
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
      await user.save();
  
      res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
      console.error("Password update error:", error);
      res.status(500).json({ error: "Server error." });
    }
  };


  exports.logoutAllSessions = async (req, res) => {
    const { userId } = req.body;
  
    if (!userId) return res.status(400).json({ error: "Missing userId" });
  
    try {
      // Clear all refresh tokens (if stored in DB)
      await User.findByIdAndUpdate(userId, { refreshTokens: [] }); // Adjust if you're storing differently
  
      res.status(200).json({ message: "Logged out from all sessions" });
    } catch (err) {
      console.error("Logout All Error:", err);
      res.status(500).json({ error: "Failed to logout from all sessions" });
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
  
  