const jwt = require('jsonwebtoken');
const User = require('../Models/userSchema');
require('dotenv').config()

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.refreshToken

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    
    // Attach the user object to the request
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
