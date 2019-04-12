const mongoose = require('mongoose');

const DB = {
  user: process.env.NYSL_DB_USERNAME,
  password: process.env.NYSL_DB_PASSWORD,
};

const uri = `mongodb+srv://${DB.user}:${DB.password}@nysl-9mm76.mongodb.net/test?retryWrites=true`;

mongoose.connection.on('connected', () => {
  mongoose.connection.db = mongoose.connection.client.db('main');
});

mongoose.connect(uri, { useNewUrlParser: true });
