const express = require('express')
const app = express()
const port = 3005

const Review = require('./db/reviewmodel.js')
const ReviewMeta = require('./db/reviewmeta.js')
const db = require('./db/index.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/reviews/:page&:count&:sort&:product_id', function(req, res) {
  let { page, count, sort, product_id } = req.params;
  product_id = Number(product_id);
  console.log(req.params);
  console.log(db);
  Review.find({product: product_id})
    .then((data) => res.send(data))
    .then((data) => console.log(data))
    .catch((err) => res.send(err));
});

app.get('/api/reviews/meta', function(req, res) {
  ReviewMeta.find().sort({"createdAt": -1})
    .then((data) => res.send(data));
});

// app.patch('/api/blogs/:blogId', function(req, res) {
//   // TODO - your code here!
//   // console.log('req', req.body);
//   let theId = `${req.params.blogId}`;
//   // console.log('req', theId);
//   Blogs.updateOne({"_id": theId}, {$inc: {"views": 1}})
//     .then((data) => res.send(data))
//     .then(() => console.log('yup, done'));
// });

app.listen(port, () => {
  console.log(`Reviews app listening at http://localhost:${port}`)
})