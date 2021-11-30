const mongoose = require("mongoose");
const db = require('./index.js');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Review = new Schema({
  product_id: Number
});

const Characteristics = new Schema({
  id: Number,
  product_id: Number,
  name: String
});

const Characteristics_Reviews = new Schema({
  id: Number,
  characteristic_id: Number,
  review_id: Number,
  value: Number
});

// convert prod id to a number, convert to string when serving to client to save local storage
// investigate nested collections
// shape of data client is expecting

const Prod = mongoose.model('Review', Review);

const Char = mongoose.model('Characteristics', Characteristics);

const CharRev = mongoose.model('Characteristics_Reviews', Characteristics_Reviews);

let references = {
  prod: Prod,
  char: Char,
  charRev: CharRev
}
module.exports = references;