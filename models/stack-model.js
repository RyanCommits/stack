const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stackSchema = new Schema({
    stackName: {
      type: String,
      required: true
    },

    cards: [{
      cardFront: String,
      cardBack: String
    }],

    user: {
      type: Schema.Types.ObjectId,
      required: true
    },
  },

  {
    timestamps: true
  }
);


const StackModel = mongoose.model('Stack', stackSchema);

module.exports = StackModel;
