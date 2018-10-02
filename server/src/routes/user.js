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
  .catch((e) => {
    if (e.code === 'ER_DUP_ENTRY') {
      res.sendStatus(409);
    } else {
      next(e);
    }
  }));

router.get('/members', (req, res, next) => queries
  .getTeamMembers(req.user.id)
  .then(members => res.send(
    members.reduce((acc, { id, ...member }) => {
      acc[id] = member;
      return acc;
    }, {}),
  ))
  .catch(next));

router.delete('/members/:ids', (req, res, next) => queries
  .deleteTeamMembers(req.user.id, (req.params.ids || '').split(','))
  .then(() => res.end())
  .catch(next));

module.exports = router;
