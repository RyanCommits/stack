const express = require('express');
const router  = express.Router();

router.get('/dashboard/', (req, res, next) => {
  res.redirect('/dashboard/home');
});

router.get('/dashboard/home', (req, res, next) => {
  res.locals.path = 'Dashboard';
  res.render('dash-views/dashboard.ejs', { layout: 'dashlayout.ejs' });
});

router.get('/dashboard/profile', (req, res, next) => {
  res.locals.path = 'Profile';
  res.render('dash-views/profile.ejs', { layout: 'dashlayout.ejs' });
});

module.exports = router;
