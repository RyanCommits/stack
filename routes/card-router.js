const express = require('express');
const StackModel = require('../models/stack-model.js');

const router = express.Router();

router.post('/dashboard', (req, res, next) => {

  theUser.save((err) => {
    if (err) {
      next(err);
      return;
    }
    req.flash('signupSuccess', 'Sign up successful! Try logging in.');

    res.redirect('/');
  });

});

module.exports = router;
