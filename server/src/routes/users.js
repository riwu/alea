const express = require('express');
const bcrypt = require('bcrypt');
const queries = require('../database/queries');

const router = express.Router();

router.post('/', async (req, res, next) => {
  ['email', 'password', 'displayName'].forEach((key) => {
    const value = req.body[key];
    req.body[key] = typeof value === 'string' ? value.trim() : value;
  });

  return queries
    .addUser({ ...req.body, password: await bcrypt.hash(req.body.password, 10) })
    .then(({ insertId: id }) => {
      req.login({ id }, async (err) => {
        if (err) {
          return next(err);
        }
        return res.end();
      });
    })
    .catch((e) => {
      if (e.code === 'ER_DUP_ENTRY') {
        res.sendStatus(409);
      } else {
        next(e);
      }
    });
});

router.patch('/me', (req, res, next) => queries
  .updateUser(req.user.id, req.body)
  .then(() => res.end())
  .catch(next));

module.exports = router;
