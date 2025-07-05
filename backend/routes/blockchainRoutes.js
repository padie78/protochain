const express = require('express');
const Block = require('../blockchain/blockchain');
const BlockModel = require('../models/block.model');
const TxModel = require('../models/transaction.model');
const User = require('../models/user.model');
const { authMiddleware } = require('../middlewares/auth');
const { signData, verifySignature } = require('../utils/crypto-utils');

const router = express.Router();

module.exports = () => {
  
  router.get('/blocks', async (req, res) => {
    const blocks = await BlockModel.find().sort({ index: 1 });
    res.json(blocks);
  });

  

  


  router.post('/mine', async (req, res) => {
    const txs = await TxModel.find();
    const count = await BlockModel.countDocuments();
    const previous = await BlockModel.findOne().sort({ index: -1 });

    const block = new Block(
      count,
      Date.now().toString(),
      txs,
      previous ? previous.hash : '0'
    );

    await block.mineBlock(2);
    await TxModel.deleteMany({}); // limpiar pendientes

    const allBlocks = await BlockModel.find().sort({ index: 1 });
    res.json({ message: 'Block mined', chain: allBlocks });
  });

  return router;
};
