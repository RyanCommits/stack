const express = require('express');
const StackModel = require('../models/stack-model.js');

const router = express.Router();

router.post('/dashboard/home', (req, res, next) => {

  const newStack = new StackModel({
    stackName: req.body.newName
  });

  newStack.save((err) => {
    if (err) {
      next(err);
      return;
    }

    res.redirect('/dashboard/home');
  });

});

// Delete stack --------------------------------------------------------------

router.post('/dashboard/home/:stackId/delete', (req, res, next) => {
    StackModel.findByIdAndRemove(
      req.params.stackId,

      (err, stackInfo) => {
          if (err) {
              next(err);
              return;
          }

          res.redirect('/dashboard/home');
      }
    );
});

// Edit stack ----------------------------------------------------------------

router.get('/dashboard/:stackId', (req, res, next) => {

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

        // send the results to the view
        res.locals.singleStack = oneStack;
        res.locals.path = oneStack.stackName;

        res.render('dash-views/edit-stack.ejs', { layout: 'dashlayout.ejs' });
    });
});

module.exports = router;
