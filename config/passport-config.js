const passport = require('passport');
const UserModel = require('../models/user-model.js');
const bcrypt = require('bcrypt');

const LocalStrategy = require('passport-local').Strategy;
const FbStrategy = require('passport-facebook').Strategy;

passport.serializeUser((userFromDb, done) => {
  done(null, userFromDb._id);
});

passport.deserializeUser((idFromBowl, done) => {
  UserModel.findById(
    idFromBowl,

    (err, userFromDb) => {
      if (err) {
        done(err);
        return;
      }

      done(null, userFromDb);
    }
  );
});

// Email Login -----------------------------------------------

passport.use(
  new LocalStrategy(
    {
      usernameField: 'loginEmail',
      passwordField: 'loginPassword'
    },
    (emailValue, passValue, done) => {

      UserModel.findOne(
        { email: emailValue },

        (err, userFromDb) => {
          if (err) {
            done(err);
            return;
          }

          if(userFromDb === null) {

            done(null, false, { message: 'Incorrect Email, Try Again.'});
            return;
          }

          const isGoodPassword = bcrypt.compareSync(passValue, userFromDb.encryptedPassword);

          if (isGoodPassword === false) {
            done(null, false, { message: 'Incorrect Password, Try Again.'});
            return;
          }

          done(null, userFromDb);
        }
      );
    }
  )
);

// Facebook Login ----------------------------------------

passport.use(
  new FbStrategy(
    {
      clientID: process.env.fb_app_id,
      clientSecret: process.env.fb_app_secret,
      callbackURL: '/auth/Facebook/callback'
    },
    (accessToken, refreshToken, profile, done) => {

      UserModel.findOne(
        { facebookID: profile.id },
        (err, userFromDb) => {
          if (err) {
            done(err);
            return;
          }

          if (userFromDb) {
            done(null, userFromDb);
            return;
          }

          const theUser = new UserModel({
            facebookID: profile.id,
            email: 'facebook',
            firstName: profile.displayName
          });

          theUser.save((err) => {
            if (err) {
              done(err);
              return;
            }

            done(null, theUser);
          });
        }
      );
    }
  )
);
