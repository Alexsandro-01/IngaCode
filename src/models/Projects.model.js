const { Schema } = require('mongoose');
const db = require('./connection');

const Projectchema = new Schema(
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

const ProjectModel = db.model('Projects', Projectchema);

module.exports = ProjectModel;