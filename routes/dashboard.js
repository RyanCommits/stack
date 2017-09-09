const express = require('express');
const router  = express.Router();

router.get('/dashboard', (req, res, next) => {
  res.render('dash-views/dash.ejs', { layout: 'dashlayout.ejs' });
});

module.exports = router;
