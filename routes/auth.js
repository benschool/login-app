const express = require('express');
const router = express.Router();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { Login } = require('../db');

passport.use(new LocalStrategy((username, password, done) => {
  console.log(username, password, 'hi');
    Login.findOne({ username }, function (err, user) {
      console.log(err, user);
      if (err) return done(err);
      if (!user) return done(null, false, { message: 'Username or password incorrect' });
      if (!user.validPassword(password)) return done(null, false, { message: 'Username or password incorrect' });

      return done(null, user);
    });
  }
));

router.post('/login',
  passport.authenticate('local' , { failureRedirect: '/login', failureFlash: true })
);

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.post('/register', (req, res) => {
  Login.exists({ username: req.data.username }, (err, exists) => {
    if (err) return res.send({error: 'Error with the database'});
    if (exists) return res.send({error: 'That username is taken'});

    let user = new Login();
    user.username = req.data.username;
    user.password = hash(req.data.password);
    user.save();

    res.send({});
  })
});

function hash(text) {
  return crypto.createHash('sha256').update(text).digest('base64');
}

module.exports = router;