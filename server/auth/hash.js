const sodium = require('sodium').api;

function generate(password) {
  const passwordBuffer = Buffer.from(password, 'latin1');
  return sodium.crypto_pwhash_str(
    passwordBuffer,
    sodium.crypto_pwhash_OPSLIMIT_INTERACTIVE,
    sodium.crypto_pwhash_MEMLIMIT_INTERACTIVE
  );
}

function verifyUser(hash, password) {
  const passwordBuffer = Buffer.from(password, 'latin1');
  return sodium.crypto_pwhash_str_verify(hash, passwordBuffer);
}

module.exports = {
  generate,
  verifyUser
};
