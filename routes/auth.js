const crypto = require('crypto');

const express = require('express');
const router = express.Router();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { Login } = require('../db');

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      Login.findOne({ username }).then((user) => {
        if (!user) return done(null, false, { message: 'Username or password incorrect' });
        if (user.password !== hash(password)) return done(null, false, { message: 'Username or password incorrect' });
        return done(null, user);
      })
    } catch(e) {
      return done(e)
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

router.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    console.log('success');
    res.status(200).send(req.user);
  }
);

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.post('/register', (req, res) => {
  Login.exists({ username: req.body.username }, (err, exists) => {
    console.log(err, exists);
    if (err) return res.status(500).send('Error with the database');
    if (exists) return res.status(406).send('That username is taken');

    let user = new Login();
    user.username = req.body.username;
    user.password = hash(req.body.password);
    user.save();

    res.status(200).send('OK');
  })
});

function hash(text) {
  return crypto.createHash('sha256').update(text).digest('base64');
}

module.exports = router;