const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.end();
});
router.get('/favicon.ico', (req, res) => {
  // for browser request
  res.sendStatus(204);
});

module.exports = router;
