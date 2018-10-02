const express = require('express');
const queries = require('../database/queries');
const authenticate = require('../middleware/authenticate');

const router = express.Router();
router.use(authenticate);

router.patch('/', (req, res, next) => queries
  .updateUser(req.user.id, req.body)
  .then(() => res.end())
  .catch(next));

router.post('/members', (req, res, next) => queries
  .addTeamMember(req.user.id, req.body)
  .then(({ insertId }) => res.send({ id: insertId }))
  .catch(next));

module.exports = router;
