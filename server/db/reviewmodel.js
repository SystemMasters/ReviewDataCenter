const mongoose = require("mongoose");
const db = require('./index.js');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProdReview = new Schema({
  product: Number,
  page: Number,
  count: Number,
  results: [
    {
      review_id: Number,
      rating: Number,
      summary: String,
      recommend: Boolean,
      response: String,
      body: String,
      date: String,
      reviewer_name: String,
      helpfulness: Number,
      reported: Boolean,
      photos: [{
          id: Number,
          url: String
        },
      ]
    },
  ]
});

ProdReview.pre('find', function() {
  this._startTime = Date.now();
});

ProdReview.post('find', function() {
  if (this._startTime != null) {
    console.log('Runtime in MS: ', Date.now() - this._startTime);
  }
});

// convert prod id to a number, convert to string when serving to client to save local storage
// investigate nested collections
// shape of data client is expecting

const Review = mongoose.model('ProdReview', ProdReview);

module.exports = Review;