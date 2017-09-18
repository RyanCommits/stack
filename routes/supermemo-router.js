const express = require('express');
const StackModel = require('../models/stack-model.js');
const CardModel = require('../models/card-model.js');
const ensureLogin = require("connect-ensure-login");

const router = express.Router();

router.post('/dashboard/my-stacks/:stackId/test', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {

  StackModel.findById(req.params.stackId,

    (err, stackInfo) => {
        if (err) {
            next(err);
            return;
        }

  req.body.difficulty.forEach(function(formCard) {
      let eachCardId = formCard.cardId;
      let eqScore = formCard.score;
      

      stackInfo.cards.forEach(function(card) {
        if (card._id.toString() === eachCardId) {
          card.ef = eqScore;
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
