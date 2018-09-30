// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.error('Gotten error', err);
  if (res.headersSent) {
    next(err);
    return;
  }
  res.status(err.status || 400).send(err.message);
};

module.exports = errorHandler;
