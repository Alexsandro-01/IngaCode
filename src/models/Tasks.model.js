const { Schema } = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const db = require('./connection');
const Errors = require('../errors/Errors');

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

async function getTaskById(_id) {
  try {
    const task = await TaskModel.findOne({
      $and: [
        { _id },
        { DeletedAt: null },
      ],
    });

    return task;
  } catch (error) {
    Errors.InternalServerError();
  }
}

async function deleteTaskById(_id) {
  try {
    const response = await TaskModel.findOneAndUpdate(
      { _id },
      { DeletedAt: new Date().toJSON() },
    );
    return response;
  } catch (error) {
    Errors.InternalServerError();
  }
}

async function createNewTask(payload) {
  try {
    await TaskModel.create({
      _id: uuidv4(),
      Name: payload.Name,
      Description: payload.Description,
      ProjectId: payload.ProjectId,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
    });
  } catch (error) {
    Errors.InternalServerError();
  }
}

async function updateTaskById(payload, _id) {
  try {
    await TaskModel.findOneAndUpdate(
      { _id },
      {
        ...payload,
        UpdatedAt: new Date().toJSON(),
      },
    );
  } catch (error) {
    Errors.InternalServerError();
  }
}

async function getAlltasks() {
  try {
    const response = await TaskModel.find(
    {
      DeletedAt: null,
    },
    {
      DeletedAt: 0,
      CreatedAt: 0,
      UpdatedAt: 0,
    },
);
    return response;
  } catch (error) {
    Errors.InternalServerError();
  }
}

async function getTasksByProjectId(projectId) {
  try {
    const response = TaskModel.find(
      { ProjectId: projectId },
    );
    return response;
  } catch (error) {
    Errors.InternalServerError();
  }
}

async function deleteTasksByProjectId(projectId) {
  try {
    const response = TaskModel.updateMany(
      { ProjectId: projectId },
      { $set: {
        DeletedAt: new Date().toJSON(),
      } },
    );
    return response;
  } catch (error) {
    Errors.InternalServerError();
  }
}

module.exports = {
  getAlltasks,
  getTaskById,
  createNewTask,
  deleteTaskById,
  updateTaskById,
  getTasksByProjectId,
  deleteTasksByProjectId,
};