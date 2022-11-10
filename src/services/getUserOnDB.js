const Errors = require('../errors/Errors');
const UserModel = require('../models/Users.model');

async function getUserOnDB(payload) {
  try {
    const user = await UserModel.findOne({
      $and: [
        { UserName: payload.UserName },
        { DeletedAt: null },
      ],
    });

    return user;
  } catch (error) {
    Errors.InternalServerError();
  }
}

module.exports = getUserOnDB;