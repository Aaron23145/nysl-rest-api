const express = require('express');

const router = express.Router();

const { createClient } = require('../mongodb');

router.get('/', (req, res) => {
  const client = createClient();

  client.connect((err) => {
    if (err) throw new Error(err);

    const collection = client.db('main').collection('games');
    collection.find({}).toArray((queryErr, data) => {
      if (queryErr) throw new Error(queryErr);

      res.json(data);
    });
    client.close();
  });
});

module.exports = router;
