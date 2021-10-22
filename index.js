const express = require('express');
const app = require('./app');
const port = 3000;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({username: username}, function (err, user) {
      if (err) return done(err);
      if (!user) return done(null, false, {message: 'Incorrect username.'});
      if (!user.validPassword(password)) return done(null, false, {message: 'Incorrect password.'});

      return done(null, user);
    });
  }
));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
