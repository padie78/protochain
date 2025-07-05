const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const blockchainRoutes = require('./routes/blockchainRoutes');
const walletsRoutes = require('./routes/walletRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

const mongoURL = process.env.MONGO_URL || 'mongodb://mongo:27017/blockchain';

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

app.use(cors());
app.use(bodyParser.json());

app.use('/api/blockchain', blockchainRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/wallets', walletsRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Blockchain API running on port ${PORT}`);
});
