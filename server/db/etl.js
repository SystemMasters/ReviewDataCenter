const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db  = require('./index.js');
const Review = require('./reviewmodel.js')
const ReviewMeta = require('./reviewmeta.js')

// create custom connection
const Conn = mongoose.createConnection();
/*
// connect to database

// could use for logic to fill the database


const start = async function() {
  await Conn.openUri('mongodb://localhost/ProdReviews');

  await Conn.collection('reviews').aggregate([
    {
      $lookup:
        {
          from: "reviews_photos",
          localField: "id",
          foreignField: "review_id",
          as: "photos"
        }
   },
   {
     $sample:
     {
       size: 500
     }
   },
   {
      $merge:
      {
         into: "TESTING",
         on: "_id",
         whenMatched: "replace",
         whenNotMatched: "insert"
       }
    }
 ])
 console.log('hmm')
}

start()
  .then(() => console.log('YIPPIEE!'))
  .catch((err) => console.log(err));

db.review.aggregate([
   {
     $lookup:
       {
         from: "reviews",
         localField: "id",
         foreignField: "product_id",
         as: "results"
       }
  }
],
{
   allowDiskUse: true
 }
)

const insertSampleBlogs = function() {
  Blog.create(samplePosts)
    .then(() => db.close());
};

insertSampleBlogs();

db.reviews'.aggregate([
  {
    $lookup:
      {
        from: "reviews_photos",
        localField: "id",
        foreignField: "review_id",
        as: "photos"
      }
 },
 {
    $out:
    {
       db: 'ProdReviews',
       coll: 'results'
     }
  }
], {
  allowDiskUse: true,
  maxTimeMS: 0
})
*/
const getMeta = async function(product_id) {

  // await Conn.openUri('mongodb://localhost/ProdReviews');
  console.log('hmm', product_id);
  let product = await db.collection('review').find({id: product_id});
  if ((await product.count()) === 0) {
    console.log("No documents found!");
  }
  // console.log('hmm', product);
  // return product;
}

module.exports = getMeta;