const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String, // hash
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  wallet: {
    publicKey: String,
    privateKey: String,
  },
});

module.exports = mongoose.model('User', userSchema)