const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
  index: Number,
  timestamp: String,
  transactions: Array,
  previousHash: String,
  hash: String,
  nonce: Number,
});

module.exports = mongoose.model('Block', blockSchema);
