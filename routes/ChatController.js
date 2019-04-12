const express = require('express');
const Message = require('../models/Message');
const jwtAuth = require('../middleware/jwtAuth');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(jwtAuth);

router.get('/', async (req, res) => {
  let messages;
  try {
    messages = await Message.find();
    if (!Object.keys(messages).length) {
      return res.json({ message: 'No messages found.', result: null });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error.', result: null });
  }

  return res.json({ message: 'Messages found.', result: { messagesFound: messages } });
});

router.post('/send', async (req, res) => {
  if (!req.body.content) return res.status(400).json({ message: 'Missing content parameter.', result: null });

  const message = new Message({
    date: new Date(),
    userName: req.user.name,
    content: req.body.content,
  });

  try {
    await message.save();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error.', result: null });
  }

  return res.json({ message: 'Message sent successfully.', result: null });
});

module.exports = router;
