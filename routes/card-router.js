const express = require('express');
const StackModel = require('../models/stack-model.js');
const CardModel = require('../models/card-model.js');
const ensureLogin = require("connect-ensure-login");

const router = express.Router();

router.post('/dashboard/home', (req, res, next) => {

  const newStack = new StackModel({
    stackName: req.body.newName,
    user: req.user._id
  });

  newStack.save((err) => {
    if (err) {
      next(err);
      return;
    }

    res.redirect('/dashboard/my-stacks');
  });

});

// Delete stack --------------------------------------------------------------

router.post('/dashboard/:stackId/delete', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {
    StackModel.findByIdAndRemove(
      req.params.stackId,

      (err, stackInfo) => {
          if (err) {
              next(err);
              return;
          }

          res.redirect('/dashboard/my-stacks');
      }
    );
});

// Stack privacy: shared--------------------------------------------------------------

router.post('/dashboard/:stackId/shared', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {
    StackModel.updateOne(
      {
        _id: req.params.stackId
      },

      {
        $set: {
          'shared': 'true'
          }
        },

      (err, stackInfo) => {
          if (err) {
              next(err);
              return;
          }

          res.redirect('/dashboard/my-stacks');
      }
    );
});

// Stack privacy: private--------------------------------------------------------------

router.post('/dashboard/:stackId/private', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {
    StackModel.updateOne(
      {
        _id: req.params.stackId
      },

      {
        $set: {
          'shared': 'false'
          }
        },

      (err, stackInfo) => {
          if (err) {
              next(err);
              return;
          }

          res.redirect('/dashboard/my-stacks');
      }
    );
});

// Edit stack path --------------------------------------------------------

router.get('/dashboard/my-stacks/:stackId', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {

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

// Add Card ----------------------------------------------------------------

router.post('/dashboard/:stackId', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {

  const currentStack = req.params.stackId;

  StackModel.findById(
    currentStack,

    (err, oneStack) => {
      if (err) {
          next(err);
          return;
      }

    const theCard = new CardModel({
      cardFront: req.body.cardFront,
      cardBack: req.body.cardBack,
      user: req.user._id
    });

    oneStack.cards.push( theCard );

    oneStack.save((err) => {
      if(err) {
        next(err);
        return;
      }

    res.redirect('/dashboard/my-stacks/' + currentStack);

    });
  });
});

// Delete Card --------------------------------------------------------------

router.post('/dashboard/:stackId/:cardId/delete', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {
    StackModel.update(
      { _id: req.params.stackId },
      { $pull: { cards: { _id: req.params.cardId } } },

      (err, stackInfo) => {
          if (err) {
              next(err);
              return;
          }

          res.redirect('/dashboard/my-stacks/' + req.params.stackId);
      }
    );
});

// Edit Card ----------------------------------------------------------------

router.post('/dashboard/:stackId/:cardId/edit', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {

    StackModel.updateOne(
      {
        _id: req.params.stackId,
        "cards._id": req.params.cardId
      },

      {
        $set: {
          'cards.$.cardFront': req.body.cardFront,
          'cards.$.cardBack': req.body.cardBack
          }
        },

      (err, oneStack) => {
        // if there's a database error...
        if (err) {
            // skip to the error handler middleware
            next(err);
            // return to avoid showing the view
            return;

        }

        res.redirect('/dashboard/my-stacks/' + req.params.stackId);

        res.render('dash-views/edit-stack.ejs', { layout: 'dashlayout.ejs' });
    });
});

module.exports = router;
