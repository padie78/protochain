const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const Tx = require('../models/transaction.model');
const { authMiddleware, isAdmin } = require('../middlewares/auth');
const { signData, verifySignature } = require('../utils/crypto-utils');


router.post('/transactions', authMiddleware, async (req, res) => {
    const { toPublicKey, amount } = req.body;
    const sender = await User.findById(req.user.id);

    if (!sender) return res.status(404).json({ error: 'User not found' });

    const data = JSON.stringify({
      from: sender.wallet.publicKey,
      to: toPublicKey,
      amount,
      timestamp: Date.now(),
    });

    const signature = signData(data, sender.wallet.privateKey);
    const valid = verifySignature(data, signature, sender.wallet.publicKey);

    if (!valid) return res.status(400).json({ error: 'Invalid sign' });

    const tx = new Tx({
      from: sender.wallet.publicKey,
      to: toPublicKey,
      amount,
      signature,
      default: () => Math.floor(Date.now() / 1000)
    });

    await tx.save();

    res.json({ message: 'Transacción creada', tx });
});

// Checking transactions history
router.get('/transactions', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  const txs = await Tx.find({
    $or: [
      { from: user.wallet.publicKey },
      { to: user.wallet.publicKey },
    ],
  });

    res.json(txs);
});

// Obtener la wallet del usuario autenticado
router.get('/me', authMiddleware, async (req, res) => {
  console.log('req');
  const user = await User.findById(req.user.id);
  console.log('user', user);
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(user.wallet.publicKey);
});

// Ruta de administrador: ver todas las wallets
router.get('/admin/wallets', authMiddleware, isAdmin, async (req, res) => {
  const users = await User.find({}, 'username wallet');
  res.json(users);
});

module.exports = router;
