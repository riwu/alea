const express = require('express');
const nodemailer = require('nodemailer');
const aws = require('aws-sdk');
const authenticate = require('../middleware/authenticate');
const queries = require('../database/queries');
const data = require('./data');

const dataMap = Object.entries(data).reduce((acc, [, { traits }]) => {
  Object.entries(traits).forEach(([traitId, trait]) => {
    acc[traitId] = trait;
  });
  return acc;
}, {});

const router = express.Router();

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_SES_REGION,
});

const transporter = nodemailer.createTransport({
  SES: new aws.SES({
    apiVersion: '2010-12-01',
  }),
  sendingRate: 14,
});

router.get('/me', authenticate, (req, res, next) => queries
  .getFeedback(req.user.id)
  .then(rows => res.send(
    rows.reduce((acc, { id, ...row }) => {
      acc[id] = row;
      return acc;
    }, {}),
  ))
  .catch(next));

router.post('/', (req, res, next) => queries
  .postFeedback(req.query.t, req.body.adaptabilities, req.body.comments)
  .then(() => {
    res.end();
    return queries.deleteFeedbackToken(req.query.t);
  })
  .catch(next));

router.post('/others', authenticate, async (req, res, next) => {
  try {
    const { displayName, email } = await queries.getFeedbackRequesterInfo(req.user.id);
    await transporter.sendMail({
      from: process.env.AWS_SES_EMAIL,
      to: req.body.email,
      subject: `Deloitte: ${displayName} (${email}) has some feedback for you!`,
      text:
        req.body.adaptabilities.map(id => `- ${dataMap[id]}`).join('\n')
        + (req.body.comments ? `\n\nOther comments: ${req.body.comments}` : ''),
    });
    res.end();
  } catch (e) {
    next(e);
  }
});

router.get('/request', (req, res, next) => queries
  .getFeedbackRequestInfo(req.query.t)
  .then((info) => {
    if (info) {
      res.send(info);
    } else {
      res.sendStatus(404);
    }
  })
  .catch(next));

router.post('/request', authenticate, async (req, res, next) => {
  try {
    const { displayName, email } = await queries.getFeedbackRequesterInfo(req.user.id);

    const tokenPromises = Promise.all(
      req.body.memberIds.map(id => queries.createFeedbackToken(id)),
    );

    const members = await queries.getMemberEmails(req.user.id, req.body.memberIds);
    const tokens = (await tokenPromises).reduce((acc, { token, id }) => {
      acc[id] = token;
      return acc;
    }, {});

    const promises = members.map(({ email: toEmail, id }) => transporter.sendMail({
      from: process.env.AWS_SES_EMAIL,
      to: toEmail,
      subject: `Deloitte: ${displayName} (${email}) requested your feedback!`,
      text: `Please provide your feedback for ${displayName} (${email}) at ${
        process.env.FEEDBACK_URL
      }?t=${tokens[id]}`,
    }));
    await Promise.all(promises);
    res.end();
  } catch (e) {
    next(e);
  }
});

module.exports = router;
