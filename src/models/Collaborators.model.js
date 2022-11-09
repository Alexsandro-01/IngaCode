const { Schema } = require('mongoose');
const db = require('./connection');

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

module.exports = CollaboratorModel;