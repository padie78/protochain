const mongoose = require('mongoose');

const txSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  amount: { type: Number, required: true },
  signature: { type: String, required: true },
  timestamp: { type: Number, default: Math.floor(Date.now() / 1000) }
});

module.exports = mongoose.model('Tx', txSchema);
