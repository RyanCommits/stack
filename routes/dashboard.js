const express = require('express');
const StackModel = require('../models/stack-model.js');
const router  = express.Router();

router.get('/dashboard/', (req, res, next) => {
  res.redirect('/dashboard/home');
});

router.get('/dashboard/home', (req, res, next) => {

  // find the products in the database
  StackModel.find((err, stackList) => {
      // if there's a database error...
      if (err) {
          // skip to the error handler middleware
          next(err);
          // return to avoid showing the view
          return;

      }

      // send the results to the view
      res.locals.allStacks = stackList;

      res.locals.path = 'Dashboard';

      res.render('dash-views/dashboard.ejs', { layout: 'dashlayout.ejs' });
  });
});

router.get('/dashboard/profile', (req, res, next) => {
  res.locals.path = 'Profile';
  res.render('dash-views/profile.ejs', { layout: 'dashlayout.ejs' });
});

router.get('/dashboard/new-stack', (req, res, next) => {
  res.locals.path = 'New Stack';
  res.render('dash-views/new.ejs', { layout: 'dashlayout.ejs' });
});

module.exports = router;
