const passport = require('passport');

//const UserModel = require('../models/user-model.js');

// passport.serializeUser((userFromDb, done) => {
//   done(null, userFromDb._id);
// });
//
// passport.deserializeUser((idFromBowl, done) => {
//   UserModel.findById(
//     idFromBowl,
//
//     (err, userFromDb) => {
//       if (err) {
//         done(err);
//         return;
//       }
//
//       done(null, userFromDb);
//     }
//   );
// });
