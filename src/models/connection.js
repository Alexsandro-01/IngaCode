const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/INGACODE');

module.exports = mongoose;