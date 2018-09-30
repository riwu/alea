const express = require('express');
const passport = require('passport');
const queries = require('../database/queries');

const router = express.Router();

router.post('/', passport.authenticate('local'), (req, res, next) => queries
  .getUserInfo(req.user.id)
  .then(user => res.send(user))
  .catch(next));

module.exports = router;
