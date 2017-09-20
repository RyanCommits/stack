const mongoose = require('mongoose');
const StackModel = require('../models/stack-model.js');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },

    firstName: {
      type: String,
      required: true
    },

    encryptedPassword: { type: String },

    facebookID: { type: String },

    googleID: { type: String },

  },

  {
    timestamps: true
  }
);


const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
