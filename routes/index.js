const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.locals.signupFeedback = req.flash('signupSuccess');
  res.render('index');
});

module.exports = router;
