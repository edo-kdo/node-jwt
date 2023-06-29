const crypto = require('node:crypto'),
  jwt = require('jsonwebtoken');


const generateRsaKeyPair = () => {

  return crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
  });

}

const { publicKey, privateKey } = generateRsaKeyPair();
console.log('Generating RSA Key Pair...');
console.log('Private key:', privateKey);
console.log('Public key:', publicKey);

const algorithm = 'RS256';
console.log('Generating JWT token...');
const token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm });
console.log(`'Generated token with ${algorithm} algorithm: ${token}`);


console.log();
console.log('Trying to validate the token with a the VALID KEY!');
const decoded = jwt.verify(token, publicKey);
console.log('Successfully verified token! Decoded token content:', decoded);

console.log();
console.log('Trying to verify token with INVALID KEY');
const invalidKey = generateRsaKeyPair().publicKey;
try {

  jwt.verify(token, invalidKey);
}
catch(e) {

  console.log(e.message);
  console.log('JWT Verification failed as expected, SUCCESS!');
}