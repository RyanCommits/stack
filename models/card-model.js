const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cardSchema = new Schema({

    cardFront: { type: String },
    cardBack: { type: String },

    user: {
      type: Schema.Types.ObjectId,
      required: true
    },

    ef: {
      type: Number,
      default: 2.5
    },
    interval: {
      type: Number,
      default: 1
    } ,
    dueDate: {
      type: Date,
      default: Date.now()
    },
    nth: {
      type: Number,
      default: 1
    },
    dueAgain: {
      type: Boolean,
      default: false
    }


  },

  {
    timestamps: true
  }
);


const CardModel = mongoose.model('Card', cardSchema);

module.exports = CardModel;
