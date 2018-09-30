const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  console.log('unauthenticated');
  res.sendStatus(401);
});

module.exports = router;
