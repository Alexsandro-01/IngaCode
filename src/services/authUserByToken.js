const jwt = require('../validations/jwt');
const getUserOnDB = require('./getUserOnDB');
const Errors = require('../errors/Errors');

async function authUser(token) {
  const userData = await jwt.veryfyTokenJwt(token);
  const user = await getUserOnDB(userData);

  if (!user) {
    Errors.BadRequest();
  }
}

module.exports = authUser;