const passport = require('passport');
const UserModel = require('../models/user-model.js');
const bcrypt = require('bcrypt');

const LocalStrategy = require('passport-local').Strategy;

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
