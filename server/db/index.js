const dbUser = require('../../dbconfig.js')
const mongoose = require('mongoose');
const mongoUri = `mongodb://${dbUser.username}:${dbUser.pwd}@3.19.74.12:27017/ProdReviews`;

mongoose.connect(mongoUri, {
  connectTimeoutMS: 60000
});

const db = mongoose.connection;

module.exports = db;