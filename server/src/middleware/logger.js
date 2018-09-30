const morgan = require('morgan');

module.exports = morgan((tokens, req, res) => {
  const { password, ...body } = req.body;
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens['response-time'](req, res),
    'ms',
    req.headers['x-forwarded-for'],
    JSON.stringify(req.cookies),
    JSON.stringify(body),
  ].join(' ');
});
