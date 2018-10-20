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

router.post('/request', authenticate, async (req, res, next) => {
  try {
    const { displayName, email } = await queries.getDisplayName(req.user.id);
    console.log('d', displayName, email, process.env.AWS_SES_EMAIL);
    const promises = req.body.emails.map(toEmail => transporter.sendMail({
      from: process.env.AWS_SES_EMAIL,
      to: toEmail,
      subject: `Deloitte: ${displayName} (${email}) requested your feedback!`,
      text: `Please provide your feedback for ${displayName} (${email}) at ${
        process.env.FEEDBACK_URL
      }?t=1359d714-ee99-4129-be3b-bddf138aa41e`,
    }));
    await Promise.all(promises);
    res.end();
  } catch (e) {
    next(e);
  }
});

module.exports = router;
