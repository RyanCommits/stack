const express = require('express');
const StackModel = require('../models/stack-model.js');
const CardModel = require('../models/card-model.js');
const ensureLogin = require("connect-ensure-login");

const router = express.Router();

router.post('/dashboard/my-stacks/:stackId/:cardId/test', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {

  const currentStack = req.params.stackId;

    StackModel.findById(
      currentStack,

      (err, oneStack) => {
        // if there's a database error...
        if (err) {
            // skip to the error handler middleware
            next(err);
            // return to avoid showing the view
            return;

        }

    res.locals.singleStack = oneStack;
    res.locals.path = oneStack.stackName;

    res.render('dash-views/test.ejs', { layout: 'dashlayout.ejs' });

  });
});

module.exports = router;
