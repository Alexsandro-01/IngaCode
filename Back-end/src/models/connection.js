const mongoose = require('mongoose');
require('dotenv/config');

const { MONGO_URI } = process.env;

mongoose.connect(MONGO_URI || 'mongodb://localhost:27017/ingacode');

module.exports = mongoose;