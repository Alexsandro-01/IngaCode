const { Schema } = require('mongoose');
const db = require('./connection');

const TaskSchema = new Schema(
{
  _id: String,
  Name: String,
  Description: String,
  ProjectId: String,
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

const TaskModel = db.model('Tasks', TaskSchema);

module.exports = TaskModel;