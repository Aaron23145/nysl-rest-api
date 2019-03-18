const express = require('express')
const router = express.Router()

const { createClient } = require('../mongodb')

router.get('/', function (req, res, next) {
  const client = createClient()

  client.connect(err => {
    if (err) throw new Error(err)

    const collection = client.db('main').collection('games')
    collection.find({}).toArray(function (err, data) {
      if (err) throw new Error(err)

      res.json(data)
    })
    client.close()
  })
})

module.exports = router
