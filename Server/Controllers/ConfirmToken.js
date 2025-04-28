const jwt = require('jsonwebtoken');

const confirmToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;  // Assuming the cookie is named 'refreshToken'
  
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token not found in cookies' });
    }
  
    // Verify the refresh token if it exists
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid refresh token' });
      }
      return res.status(200).json({ message: 'Refresh token is valid' });
    });
  };

  module.exports = confirmToken;