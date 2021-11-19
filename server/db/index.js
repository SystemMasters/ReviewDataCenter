const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/ProdReviews';

mongoose.connect(mongoUri, {
});

const db = mongoose.connection;

module.exports = db;