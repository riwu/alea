const express = require('express');
const bcrypt = require('bcrypt');
const queries = require('../database/queries');

const router = express.Router();

router.post('/', (req, res, next) => {
  ['email', 'password', 'displayName'].forEach((key) => {
    const value = req.body[key];
    req.body[key] = typeof value === 'string' ? value.trim() : value;
  });

  bcrypt.hash(req.body.password, 10).then(password => queries
    .addUser({ ...req.body, password })
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
    }));
});

router.patch('/me', (req, res, next) => queries
  .updateUser(req.user.id, req.body)
  .then(() => res.end())

router.post('/me/members', (req, res, next) => queries
  .addTeamMember(req.user.id, req.body)
  .then(({ insertId }) => res.send({ id: insertId }))
  .catch(next));

module.exports = router;
