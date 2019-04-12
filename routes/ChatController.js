const express = require('express');
const jwtAuth = require('../middleware/jwtAuth');

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(jwtAuth);

router.get('/', (req, res) => {
  res.json(req.user);
});

module.exports = router;
