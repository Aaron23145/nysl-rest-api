const User = require('../models/User');
const { verifyToken, jwtSecretKey } = require('../utils');

module.exports = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ message: 'No token provided', result: null });

  let decodedToken;
  try {
    decodedToken = await verifyToken(token, jwtSecretKey);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error while trying to verify token.', result: null });
  }

  let user;
  try {
    user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(400).json({ message: 'Invalid token.', result: null });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An error has ocurred while trying to verify your token.', result: null });
  }

  req.user = user;
  next();
};
