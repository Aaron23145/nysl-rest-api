const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const GameController = require('./routes/GameController');
const AuthController = require('./routes/AuthController');
const ChatController = require('./routes/ChatController');
require('./db');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/games', GameController);
app.use('/auth', AuthController);
app.use('/chat', ChatController);

app.all('*', (req, res) => {
  res.status(404).send(`
    404 Error. This endpoint doesn't exist.
    <a
      href="https://github.com/Aaron23145/nysl-rest-api#endpoints"
      target="_blank"
      rel="noreferrer noopener"
    >
      Check the documentation<!--
    --></a>.
  `);
});

module.exports = app;
