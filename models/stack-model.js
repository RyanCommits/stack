const mongoose = require('mongoose');
const CardModel = require('../models/card-model.js');
const Schema = mongoose.Schema;

const stackSchema = new Schema({
    stackName: {
      type: String,
      required: true
    },

    cards: [ CardModel.schema ],

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
