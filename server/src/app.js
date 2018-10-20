const express = require('express');

const app = express();

app.disable('x-powered-by');
app.use(require('./middleware/healthCheck'));

app.use(express.json());
app.use(require('./middleware/logger'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(require('./middleware/authentication'));

app.use('/users/me', require('./routes/user'));
app.use('/users', require('./routes/users'));
app.use('/sessions', require('./routes/sessions'));
app.use('/hacks', require('./routes/hacks'));
app.use('/feedback', require('./routes/feedback'));

app.use(require('./middleware/errorHandler'));

module.exports = app;
