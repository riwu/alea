const express = require('express');

const app = express();

app.disable('x-powered-by');
app.use(require('./middleware/healthCheck'));

app.use(express.json());
app.use(require('./middleware/logger'));

app.use(require('./middleware/authentication'));

app.use('/users/me', require('./routes/user'));
app.use('/users', require('./routes/users'));
app.use('/sessions', require('./routes/sessions'));
app.use('/hacks', require('./routes/hacks'));
app.use('/feedback', require('./routes/feedback'));
app.use('/rank', require('./routes/rank'));

app.use(require('./middleware/errorHandler'));

module.exports = app;
