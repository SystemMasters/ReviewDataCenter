const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/ProdReviews';

mongoose.connect(mongoUri, {
  connectTimeoutMS: 60000
});

const db = mongoose.connection;

module.exports = db;