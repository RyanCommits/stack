const express = require('express');
const StackModel = require('../models/stack-model.js');
const ensureLogin = require("connect-ensure-login");
const router  = express.Router();

router.get('/dashboard/', (req, res, next) => {
  res.redirect('/dashboard/home');
});

router.get('/dashboard/home', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {

  StackModel.find(

    { user: req.user._id },

    (err, stackList) => {

      if (err) {
          next(err);
          return;
      }

      // send the results to the view
      res.locals.allStacks = stackList;

      res.locals.path = 'Dashboard';

      res.render('dash-views/dashboard.ejs', { layout: 'dashlayout.ejs' });
  });
});

router.get('/dashboard/profile', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {
  res.locals.path = 'Profile';
  res.render('dash-views/profile.ejs', { layout: 'dashlayout.ejs' });
});

module.exports = router;
