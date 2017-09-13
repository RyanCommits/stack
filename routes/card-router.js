const express = require('express');
const StackModel = require('../models/stack-model.js');
const CardModel = require('../models/card-model.js');

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

    res.redirect('/dashboard/home');
  });

});

// Delete stack --------------------------------------------------------------

router.post('/dashboard/:stackId/delete', (req, res, next) => {
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

// Edit stack path --------------------------------------------------------

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

// Add Card ----------------------------------------------------------------

router.post('/dashboard/:stackId', (req, res, next) => {

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

    res.redirect('/dashboard/' + currentStack);
    
    });
  });
});

module.exports = router;

// Delete Card --------------------------------------------------------------

router.post('/dashboard/:stackId/:cardId/delete', (req, res, next) => {
    StackModel.update(
      { },
      { $pull: { cards: { _id: req.params.cardId } } },

      (err, stackInfo) => {
          if (err) {
              next(err);
              return;
          }

          res.redirect('/dashboard/' + req.params.stackId);
      }
    );
});

// Edit Card ----------------------------------------------------------------

// router.post('/dashboard/:stackId/:cardId/edit', (req, res, next) => {
//
//     StackModel.update(
//       { _id: req.params.stackId,
//         cards: {
//           cardFront: "old",
//           cardBack:  "oldback"
//         }
//       },
//       { $set: { cards: { cardFront:req.params.cardId },
//         cards.$.cardFront: 'super',
//         cards.$.cardBack: 'new definition'
//       (err, oneStack) => {
//         // if there's a database error...
//         if (err) {
//             // skip to the error handler middleware
//             next(err);
//             // return to avoid showing the view
//             return;
//
//         }
//
//         // send the results to the view
//         res.locals.singleStack = oneStack;
//         res.locals.path = oneStack.stackName;
//
//         res.render('dash-views/edit-stack.ejs', { layout: 'dashlayout.ejs' });
//     });
// });
