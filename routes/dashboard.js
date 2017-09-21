const express = require('express');
const StackModel = require('../models/stack-model.js');
const ensureLogin = require("connect-ensure-login");
const UserModel = require('../models/user-model.js');
const mongoose   = require('mongoose');
const router  = express.Router();

router.get('/dashboard/', (req, res, next) => {
  res.redirect('/dashboard/home');
});

router.get('/dashboard/home', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {


  StackModel.find(

  (err, allStacks) => {

      if (err) {
          next(err);
          return;
      }

      var obj ={};

      allStacks.forEach(stack => {
        var count = 0;
        stack.cards.forEach(card => {
          if (Date.now() - card.dueDate > 0 || card.dueAgain === true) {
            count++;
          }
        });
        obj[stack._id] = count;
      });

      res.locals.stacks = allStacks;
      res.locals.obj = obj;

  // find all Stacks

    StackModel.find(

      { user: req.user._id },

      (err, stackList) => {

        if (err) {
            next(err);
            return;
        }

        // send the results to the view
        res.locals.allStacks = stackList;

        res.locals.path = 'My Stacks';

        res.render('dash-views/dashboard.ejs', { layout: 'dashlayout.ejs' });

      });
    });
});

router.get('/dashboard/my-stacks', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {

  StackModel.find(

  (err, allStacks) => {

      if (err) {
          next(err);
          return;
      }

      var obj ={};

      allStacks.forEach(stack => {
        var count = 0;
        stack.cards.forEach(card => {
          if (Date.now() - card.dueDate > 0 || card.dueAgain === true) {
            count++;
          }
        });
        obj[stack._id] = count;
      });

      res.locals.stacks = allStacks;
      res.locals.obj = obj;


// find all Stacks

  StackModel.find(

    { user: req.user._id },

    (err, stackList) => {

      if (err) {
          next(err);
          return;
      }

      // send the results to the view
      res.locals.allStacks = stackList;

      res.locals.path = 'My Stacks';

      res.render('dash-views/my-stacks.ejs', { layout: 'dashlayout.ejs' });

    });
    });
});

// profile page

router.get('/dashboard/profile', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {
  res.render('dash-views/profile.ejs', { layout: 'dashlayout.ejs' });
});

// Change profile information

router.post('/dashboard/profile/edit', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {

  UserModel.updateOne(
    {_id: req.user.id },

    {
      $set: {
        email: req.body.emailChange,
        firstName: req.body.nameChange
        }
      },

    (err, currentUser) => {

      if (err) {
          next(err);
          return;
      }

      res.redirect('/dashboard/profile');
  });
});

// delete account

router.post('/dashboard/profile/delete', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {

  UserModel.findByIdAndRemove(
    {_id: req.user.id },

    (err, user) => {
        if (err) {
            next(err);
            return;
        }

    res.redirect('/');
    }
  );
});

// test all cards

router.get('/dashboard/my-stacks/:stackId/test', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {

  const currentStack = req.params.stackId;

    StackModel.findById(
      currentStack,

      (err, oneStack) => {
        if (err) {
            next(err);
            return;

        }

    res.locals.singleStack = oneStack;
    res.locals.path = oneStack.stackName;

    res.render('dash-views/test.ejs', { layout: 'dashlayout.ejs' });

  });
});

// test only due cards

router.get('/dashboard/my-stacks/:stackId/testdue', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {

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

    res.render('dash-views/testdue.ejs', { layout: 'dashlayout.ejs' });

  });
});

router.get('/dashboard/public-stacks', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {

  StackModel.find({ shared: 'true' }).populate('user').exec(

    (err, stackList) => {

      if (err) {
          next(err);
          return;
      }



      // send the results to the view
      res.locals.allStacks = stackList;

      res.locals.path = 'Public Stacks';

      res.render('dash-views/public-stacks.ejs', { layout: 'dashlayout.ejs' });

  });
});

router.get('/dashboard/:stackId/copy', ensureLogin.ensureLoggedIn('/login'), (req, res, next) => {

  const currentStack = req.params.stackId;

// find Stack to be copied

  StackModel.findOne(

    { _id: req.params.stackId },

    (err, stackToCopy) => {

      if (err) {
          next(err);
          return;
      }

// create new object with same properties, except changing user and id.

      let newStack = Object.assign({}, stackToCopy);
      newStack._doc.user = req.user._id;
      newStack._doc._id = mongoose.Types.ObjectId();
      newStack.isNew = true;

// save new object in a new model

      const copiedStack = new StackModel({
        stackName: newStack._doc.stackName,
        cards: newStack._doc.cards,
        user: req.user._id,
        shared: 'false'
      });

// reset all card supermemo data

      copiedStack.cards.forEach(card => {
        card.ef = 2.5;
        card.interval = 1;
        card.dueDate = Date.now();
        card.nth = 1;
        card.dueAgain = false;
      });

// save the model

      copiedStack.save((err) => {
        if (err) {
          next(err);
          return;
        }

      res.redirect('/dashboard/public-stacks');
      });
  });
});

module.exports = router;
