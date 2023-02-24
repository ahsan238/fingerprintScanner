const mongoose = require('mongoose');

const fingerprintSchema = new mongoose.Schema({
  hashvalue: {
    type: String,
    trim: true,
  },
  createDate: Date,
  email: String,
  fingerPrint: String,
  description: String
});

module.exports = mongoose.model('Fingerprint', fingerprintSchema);