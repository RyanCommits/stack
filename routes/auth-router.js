const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const UserModel = require('../models/user-model.js');

const router = express.Router();

// signup ---------------------------------------------------

router.get('/signup', (req, res, next) => {
  res.render('auth-views/signup-form.ejs');
});

router.post('/process-signup', (req, res, next) => {
  if (req.body.signupEmail === "" || req.body.signupPassword === "") {
    res.locals.feedbackMessage = "Please enter a valid Email and Password.";
    res.render('auth-views/signup-form.ejs');
    return;
  }

  if (req.body.firstName === "") {
    res.locals.feedbackMessage = "Please enter your first name.";
    res.render('auth-views/signup-form.ejs');
    return;
  }

  UserModel.findOne(
    { email: req.body.signupEmail },
    (err, userFromDb) => {
      if(err) {
        next(err);
        return;
      }

      if (userFromDb) {
        res.locals.feedbackMessage = "This Email already has an account.";
        res.render('auth-views/signup-form.ejs');
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const scrambledPass = bcrypt.hashSync(req.body.signupPassword, salt);

      const theUser = new UserModel({
        email: req.body.signupEmail,
        encryptedPassword: scrambledPass,
        firstName: req.body.firstName
      });

      theUser.save((err) => {
        if (err) {
          next(err);
          return;
        }
        req.flash('signupSuccess', 'Sign up successful! Try logging in.');

        res.redirect('/');
      });
    }
  );
});

// Log In ---------------------------------------------------

router.get('/login', (req, res, next) => {
  res.locals.flashError = req.flash('error');

  res.locals.logoutFeedback = req.flash('logoutSuccess');

  res.render('auth-views/login-form.ejs');
});

router.post('/process-login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
);

// Log Out -------------------------------------------------

router.get('/logout', (req, res, next) => {
  req.logout();

  req.flash('logoutSuccess', 'Log out successful.');
  res.redirect('/login');
});

// Facebook login -------------------------------------------------

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
);

module.exports = router;
