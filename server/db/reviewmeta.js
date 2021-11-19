const mongoose = require("mongoose");
const db = require('./index.js');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProdMeta = new Schema({
  product_id: Number,
  ratings: {
    2: Number,
    3: Number,
    4: Number,
  },
  recommended: {
    0: Number
  },
  characteristics: {
    Size: {
      id: Number,
      value: String
    },
    Width: {
      id: Number,
      value: String
    },
    Comfort: {
      id: Number,
      value: String
    },
  }
});

// convert prod id to a number, convert to string when serving to client to save local storage
// investigate nested collections
// shape of data client is expecting

const ReviewMeta = mongoose.model('ProdMeta', ProdMeta);

module.exports = ReviewMeta;