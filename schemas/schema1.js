const mongoose = require("mongoose");

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

const ProdMeta = new Schema({
  product_id: Number,
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

// convert prod id to a number, convert to string when serving to client to save local storage
// investigate nested collections
// shape of data client is expecting

// mongoose.model('ProdReview', ProdReview);
// mongoose.model('ProdMeta', ProdMeta);



// {
//   from: "reviews_photos",
//   localField: "id",
//   foreignField: "review_id",
//   as: "photos"
//   }
// {
//   into: 'reviewsnew',
//   on: '_id',
//   whenMatched: 'replace',
//   whenNotMatched: 'insert'
// }

// mongod -f "C:\Program Files\MongoDB\Server\4.4\bin\mongod.cfg"
