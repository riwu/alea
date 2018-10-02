const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const RedisStore = require('connect-redis')(session);
const queries = require('../database/queries');

const router = express.Router();

router.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 31536000000,
      httpOnly: true,
    },
    saveUninitialized: false,
    resave: false,
    store: new RedisStore({
      db: Number(process.env.REDIS_DATABASE_INDEX) || 0,
    }),
  }),
);
router.use(passport.initialize());
router.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      console.log('getting user', email);
      const user = await queries.getUser(typeof email === 'string' ? email.trim() : email);
      if (!user) {
        return done(null, false);
      }
      const passwordMatched = await bcrypt.compare(
        typeof password === 'string' ? password.trim() : password,
        user.password,
      );
      console.log('pass match', passwordMatched);
      if (!passwordMatched) {
        return done(null, false);
      }
      return done(null, user);
    },
  ),
);

passport.serializeUser((user, done) => {
  console.log('serialising', user.id);
  done(null, { id: user.id });
});

passport.deserializeUser(async (user, done) => {
  console.log('deserialising', user);
  done(null, user);
});

module.exports = router;
