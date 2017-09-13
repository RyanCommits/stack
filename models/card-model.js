const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cardSchema = new Schema({

    cardFront: { type: String },
    cardBack: { type: String },

    user: {
      type: Schema.Types.ObjectId,
      required: true
    },
  },

  {
    timestamps: true
  }
);


const CardModel = mongoose.model('Card', cardSchema);

module.exports = CardModel;
