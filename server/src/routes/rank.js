const express = require('express');
const queries = require('../database/queries');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/', authenticate, (req, res, next) => queries
  .getScores()
  .then((rows) => {
    const { score } = rows.find(row => row.id === req.user.id);
    res.send({
      adaptability: rows.reduce((acc, row) => acc + (row.score > score ? 1 : 0), 1),
    });
  })
  .catch(next));

module.exports = router;
