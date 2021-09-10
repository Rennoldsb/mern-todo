var express = require('express');
var router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const ValidateEmail = require('../middleware/ValidateEmail');
const ValidatePassword = require('../middleware/ValidatePassword');

router.get('/user', (req, res) => {
  res.send(req.user);
});

router.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy((e) => {
    res.clearCookie('connect.sid');
    res.status(200).send('Logged Out');
  });
});

router.post('/register', async (req, res) => {
  if (!ValidateEmail(req.body.username)) {
    res.status(400).send('Must be a valid email');
    return false;
  }

  if (!ValidatePassword(req.body.password)) {
    res.status(400).send('Does not meet password requirements.');
    return false;
  }

  User.findOne({ username: req.body.username }, (err, existingUser) => {
    if (existingUser) {
      res.status(400).send('User already exists');
      return false;
    }
  });

  try {
    User.register(
      new User({
        username: req.body.username,
        email: req.body.email,
      }),
      req.body.password,
      (err, user) => {
        if (err) {
          res.status(400).send(err);
        } else {
          passport.authenticate('local')(req, res, () => {
            //Change to your preferred action
            res.status(200).send('Successfully Registered!');
          });
        }
      }
    );
  } catch (e) {
    res.status(400).send(err);
  }
});

router.post('/login', passport.authenticate('local'), function (req, res) {
  //Change to your preferred action
  res.status(200).json(req.user.username);
});

module.exports = router;
