const crypto = require('crypto');
const BlockModel = require('../models/block.model');

class Block {
  constructor(index, timestamp, transactions, previousHash = '', nonce = 0, hash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.nonce = nonce;
    this.hash = hash || this.calculateHash();
  }

  calculateHash() {
    return crypto
      .createHash('sha256')
      .update(this.index + this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce)
      .digest('hex');
  }

  async mineBlock(difficulty) {
    while (!this.hash.startsWith(Array(difficulty + 1).join('0'))) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    const block = new BlockModel(this);
    await block.save();
  }
}

module.exports = Block;
