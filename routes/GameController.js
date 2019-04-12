const express = require('express');
const Game = require('../models/Game');

const router = express.Router();

router.get('/', async (req, res) => {
  let games;
  try {
    games = await Game.find();
    if (!Object.keys(games).length) {
      return res.json({ message: 'Not games found.', result: null });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error.', result: null });
  }

  return res.json({
    message: 'Games found.',
    result: {
      gamesFound: games,
    },
  });
});

module.exports = router;
