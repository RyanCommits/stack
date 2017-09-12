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

module.exports = router;
