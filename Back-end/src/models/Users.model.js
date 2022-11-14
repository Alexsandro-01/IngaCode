const { Schema } = require('mongoose');
const db = require('./connection');
const Errors = require('../errors/Errors');

const userSchema = new Schema(
{
  _id: String,
  UserName: String,
  Password: String,
  CreatedAt: Date,
  UpdatedAt: Date,
  DeletedAt: {
    type: Date,
    default: null,
  },
},
{
  versionKey: false,
},
);

const UserModel = db.model('Users', userSchema);

async function getUserByName(payload) {
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

module.exports = {
  getUserByName,
};