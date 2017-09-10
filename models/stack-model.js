const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stackSchema = new Schema(
  {
    stackName: {
      type: String,
      required: true
    },

    cards: [{
      cardFront: String,
      cardBack: String
    }]
  },

  {
    timestamps: true
  }
);


const StackModel = mongoose.model('Stack', stackSchema);

module.exports = StackModel;
