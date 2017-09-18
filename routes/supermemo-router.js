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


console.log(req.body.difficulty);
  req.body.difficulty.forEach(function(formCard) {
      let eachCardId = formCard.cardId;
      let eqScore = formCard.score;

      if (eqScore === '') {
        return;
      }

      stackInfo.cards.forEach(function(card) {
        if (card._id.toString() === eachCardId) {

          var newEf = superMemo.getEf(card.ef, eqScore);
          card.ef = newEf;

          var newMemo = superMemo.getInterval(newEf, card.interval, card.nth, eqScore);

          card.nth = newMemo.n;
          card.dueToday = newMemo.dueToday;
          card.interval = newMemo.int;

          const now = new Date();
          const due = new Date().setDate(now.getDate() + newMemo.int);

          card.dueDate = new Date(due);
        }
      });
  });

  stackInfo.save((err) => {
    if(err) {
      next(err);
      return;
    }


      res.redirect('/dashboard/my-stacks');
  });
});
});

module.exports = router;
