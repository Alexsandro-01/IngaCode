const jwt = require('../validations/jwt');
const UserModel = require('../models/Users.model');
const Errors = require('../errors/Errors');

async function authUser(token) {
  const userData = await jwt.veryfyTokenJwt(token);
  const user = await UserModel.getUserByName(userData);

  if (!user) {
    Errors.BadRequest();
  }
}

module.exports = authUser;