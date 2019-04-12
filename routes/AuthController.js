const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

const {
  genHash,
  checkPassword,
  genJwtToken,
  jwtSecretKey,
} = require('../utils');

router.post('/register', async (req, res) => {
  if (!req.body.name) return res.status(400).json({ message: 'Missing name parameter.', result: null });
  if (!req.body.password) return res.status(400).json({ message: 'Missing password parameter.', result: null });

  try {
    const user = await User.findOne({ name: req.body.name });
    if (user) {
      return res.status(400).json({ message: 'Name already used. Please, choose another.', result: null });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error.', result: null });
  }

  let hashedPassword;
  try {
    hashedPassword = await genHash(req.body.password, 10);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error.', result: null });
  }

  const user = new User({
    name: req.body.name,
    password: hashedPassword,
  });

  try {
    await user.save();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error.', result: null });
  }

  const token = await genJwtToken({ id: user._id }, jwtSecretKey, { expiresIn: '1d' });

  return res.json({
    message: 'User registered successfully',
    result: {
      userCreated: {
        name: user.name,
        token,
      },
    },
  });
});

router.post('/login', async (req, res) => {
  if (!req.body.name) return res.status(400).json({ message: 'Missing name parameter.', result: null });
  if (!req.body.password) return res.status(400).json({ message: 'Missing password parameter.', result: null });

  let user;
  try {
    user = await User.findOne({ name: req.body.name });
    if (!user) {
      return res.status(400).json({ message: 'Authentication failed. Please, check parameters.', result: null });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error while trying to fetch data from database.', result: null });
  }

  try {
    const match = await checkPassword(req.body.password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Authentication failed. Please, check parameters.', result: null });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error while trying to check the credentials.', result: null });
  }

  const token = await genJwtToken({ id: user._id }, jwtSecretKey, { expiresIn: '1d' });

  return res.status(200).json({
    message: 'Authentication verified.',
    result: {
      userVerified: {
        name: user.name,
        token,
      },
    },
  });
});

router.post('/unregister', async (req, res) => {
  if (!req.body.name) return res.status(400).json({ message: 'Missing name parameter.', result: null });
  if (!req.body.password) return res.status(400).json({ message: 'Missing password parameter.', result: null });

  let user;
  try {
    user = await User.findOne({ name: req.body.name });
    if (!user) {
      return res.status(400).json({ message: 'Authentication failed. Please, check parameters.', result: null });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error while trying to fetch data from database.', result: null });
  }

  try {
    const match = await checkPassword(req.body.password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Authentication failed. Please, check parameters.', result: null });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error while trying to check the credentials.', result: null });
  }

  try {
    await user.remove();
  } catch (err) {
    console.error(err);
    return res.json({ message: 'Error while trying to update database.', result: null });
  }

  return res.json({
    message: 'User deleted successfully.',
    result: {
      userDeleted: {
        name: user.name,
      },
    },
  });
});

module.exports = router;
