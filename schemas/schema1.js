const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProdReview = new Schema({
  product: String,
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

const ProdMeta = new Schema({
  product_id: String,
  ratings: {
    2: Number,
    3: Number,
    4: Number,
    // ...
  },
  recommended: {
    0: Number
    // ...
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



mongoose.model('ProdReview', ProdReview);
mongoose.model('ProdMeta', ProdMeta);