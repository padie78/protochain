const crypto = require('crypto');

function generateKeyPair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
  });

  return {
    publicKey: publicKey.export({ type: 'pkcs1', format: 'pem' }),
    privateKey: privateKey.export({ type: 'pkcs1', format: 'pem' }),
  };
}

function signData(data, privateKeyPem) {
  const sign = crypto.createSign('SHA256');
  sign.update(data).end();
  return sign.sign(privateKeyPem, 'hex');
}

function verifySignature(data, signature, publicKeyPem) {
  const verify = crypto.createVerify('SHA256');
  verify.update(data).end();
  return verify.verify(publicKeyPem, signature, 'hex');
}

module.exports = {
  generateKeyPair,
  signData,
  verifySignature,
};
