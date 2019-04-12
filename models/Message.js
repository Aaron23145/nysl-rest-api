const mongoose = require('mongoose');

const { Schema } = mongoose;

const Message = new Schema({
  date: String,
  userName: String,
  content: String,
});

module.exports = mongoose.model('Message', Message);
