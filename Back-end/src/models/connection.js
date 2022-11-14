const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ingacode');

module.exports = mongoose;