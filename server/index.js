const express = require('express')
const app = express()
const port = 3005

const Review = require('./db/reviewmodel.js')
const ReviewMeta = require('./db/reviewmeta.js')
const db = require('./db/index.js')
const references = require('./db/meta.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/reviews/', function(req, res) {
  const paramsString = req.url.replace('/api/reviews/', '');
  let searchParams = new URLSearchParams(paramsString);
  let page = searchParams.get('page');
  let product_id = searchParams.get('product_id');
  let count = searchParams.get('count');
  let sort = searchParams.get('sort');
  product_id = Number(product_id);
  console.log('hmm', product_id);
  Review.find({product: product_id})
    .then((data) => res.status(200).send(data))
    .then((data) => console.log('success', data))
    .catch((err) => res.status(400).send(err));
});

app.get('/api/reviews/meta/', function(req, res) {
  const paramsString = req.url.replace('/api/reviews/meta/', '');
  let metaVals = {
    id: '',
    characteristics: {},
    ratings: {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    },
    recommended: {
      0: 0,
      1: 0
    }
  };
  let searchParams = new URLSearchParams(paramsString);
  let product_id = searchParams.get('product_id');
  console.log(product_id);
  console.log('type', typeof(product_id));
  console.log(references);
  product_id = Number(product_id);
  metaVals.id = product_id;
  references.char.find({product_id: product_id})
    .then((data) => {
      const promises = [];
      for (let index = 0; index < data.length; index++) {
      let val = 0;
      // console.log(data[index].id);
      promises.push(references.charRev.find({characteristic_id: data[index].id})
        .then((values) => {
          // console.log('data', data);
          for (let i = 0; i < values.length; i++) {
            val = val + values[i].value;
        }
        return val = val/values.length;
        // console.log(val);
      })
        .then((value) => {
          metaVals.characteristics[data[index].name] = {
            id: data[index].id,
            value: value
          };
        })
      )
      }
      Promise.all(promises)
        .then(() => console.log('all', metaVals))
        .then(() => Review.find({product: product_id}))
        .then((data) => {

          for (let i = 0; i < data[0].results.length; i++) {
            let rec = data[0].results[i].recommend;
            let rat = data[0].results[i].rating;
            if (rec === true) {
              metaVals.recommended[1]++;
            } else {
              metaVals.recommended[0]++;
            }
            metaVals.ratings[rat]++;
          }
          res.send(metaVals);
        });
    })
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

//?page=:page&count=:count&sort=:sort&product_id=:product_id