const express = require('express');
const nodemailer = require('nodemailer');
const aws = require('aws-sdk');
const authenticate = require('../middleware/authenticate');
const queries = require('../database/queries');

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

router.post('/', (req, res, next) => queries
  .postFeedback(req.query.t, req.body.adaptabilities, req.body.comments)
  .then(() => {
    res.end();
    return queries.deleteFeedbackToken(req.query.t);
  })
  .catch(next));

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
