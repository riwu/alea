const express = require('express');
const queries = require('../database/queries');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/', (req, res, next) => queries
  .getHacks()
  .then(rows => res.send(
    rows.reduce((acc, row) => {
      row.categories.forEach((category) => {
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(row.text);
      });
      return acc;
    }, {}),
  ))
  .catch(next));

router.post('/', authenticate, (req, res, next) => queries
  .submitHack(req.user.id, req.body)
  .then(() => res.end())
  .catch(next));

module.exports = router;
