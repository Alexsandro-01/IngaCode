const jwt = require('jsonwebtoken');
const fs = require('fs/promises');
const Errors = require('../errors/Errors');

const key = 'jwt.key';

async function createTokenJwt(payload) {
  const secret = await fs.readFile(key, 'utf-8');
  const token = jwt.sign(payload, secret);

  return token;
}

async function veryfyTokenJwt(token) {
  const secret = fs.readFile(key, 'utf-8');

  try {
    const data = jwt.verify(token, secret);
    return data;
  } catch (error) {
    Errors.Unauthorized();
  }
}

module.exports = {
  createTokenJwt,
  veryfyTokenJwt,
};
