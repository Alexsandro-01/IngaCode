const { Schema } = require('mongoose');
const db = require('./connection');
const Errors = require('../errors/Errors');

const CollaboratorSchema = new Schema(
{
  _id: String,
  Name: String,
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

const CollaboratorModel = db.model('Collaborators', CollaboratorSchema);

async function getAllCollaborators() {
  try {
    const collaborators = await CollaboratorModel.find({
      DeletedAt: null,
    });

    return collaborators;
  } catch (error) {
    Errors.InternalServerError();
  }
}

async function getCollaboratorById(id) {
  try {
    const user = await CollaboratorModel.findOne({
      $and: [
        { _id: id },
        { DeletedAt: null },
      ],
    });

    return user;
  } catch (error) {
    Errors.InternalServerError();
  }
}

module.exports = {
  getAllCollaborators,
  getCollaboratorById,
};