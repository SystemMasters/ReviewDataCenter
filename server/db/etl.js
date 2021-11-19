const db  = require('./index.js');
const Review = require('./reviewmodel.js')
const ReviewMeta = require('./reviewmeta.js')

// could use for logic to fill the database

db.reviews.aggregate([
   {
     $lookup:
       {
         from: "reviews_photos",
         localField: "id",
         foreignField: "review_id",
         as: "photos"
       }
  }
],
{
   allowDiskUse: true
 }
)

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