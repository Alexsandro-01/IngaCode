const { Schema } = require('mongoose');
const db = require('./connection');

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

module.exports = UserModel;