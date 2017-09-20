const express = require('express');
const StackModel = require('../models/stack-model.js');
const CardModel = require('../models/card-model.js');
const ensureLogin = require("connect-ensure-login");
const superMemo = require('../lib/supermemo.js');

const router = express.Router();

router.post('/dashboard/my-stacks/:stackId/test', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {

superMemo.getInterval();

  StackModel.findById(req.params.stackId,

    (err, stackInfo) => {
        if (err) {
            next(err);
            return;
        }

  req.body.difficulty.forEach(function(formCard) {
      let eachCardId = formCard.cardId;
      let eqScore = formCard.score;

      if (eqScore === '') {
        return;
      }

      stackInfo.cards.forEach(function(card) {

        if (card._id.toString() === eachCardId) {

          var newEf = superMemo.getEf(card.ef, eqScore);

          var newMemo = superMemo.getInterval(newEf, card.interval, card.nth, eqScore);

// if the score is 3, just make it due again, don't change stats
// if the score is 4 or higher but was a repeat test on same day, do not change stats

          if (card.dueAgain === true && eqScore >= 3) {
            card.dueAgain = newMemo.dueAgain;
          } else {
            card.ef = newEf;
            card.nth = newMemo.n;
            card.dueAgain = newMemo.dueAgain;
            card.interval = newMemo.int;
          // stores due date in milliseconds
            card.dueDate = Date.now() + (newMemo.int * 86400000);
          }
        }
    });
  });

  stackInfo.save((err) => {
    if(err) {
      next(err);
      return;
    }


      res.redirect('/dashboard/home');
  });
});
});

module.exports = router;
