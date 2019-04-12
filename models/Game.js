const mongoose = require('mongoose');

const { Schema } = mongoose;

const Game = new Schema({
  date: String,
  teams: Array,
  location: String,
  preciseLocation: String,
  time: String,
});

module.exports = mongoose.model('Game', Game);
