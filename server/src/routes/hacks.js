const express = require('express');
const queries = require('../database/queries');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/', (req, res, next) => queries
  .getHacks()
  .then(rows => res.send(
    rows.reduce((acc, { categories, ...row }) => {
      categories.forEach((category) => {
        acc[category] = acc[category] || [];
        acc[category].push(row);
      });
      return acc;
    }, {}),
  ))
  .catch(next));

router.post('/', authenticate, (req, res, next) => queries
  .submitHack(req.user.id, req.body)
  .then(({ insertId }) => res.send({ id: insertId }))
  .catch(next));

module.exports = router;
