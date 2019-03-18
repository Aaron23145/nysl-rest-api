const MongoClient = require('mongodb').MongoClient

const DB = {
  user: process.env.NYSL_DB_USERNAME,
  password: process.env.NYSL_DB_PASSWORD
}

const uri = `mongodb+srv://${DB.user}:${DB.password}@nysl-9mm76.mongodb.net/test?retryWrites=true`

module.exports.createClient = function () {
  return new MongoClient(uri, { useNewUrlParser: true })
}
