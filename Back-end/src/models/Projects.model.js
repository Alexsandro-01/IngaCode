const { Schema } = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const db = require('./connection');
const Errors = require('../errors/Errors');

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

async function existsProjectByName(payload) {
  try {
    const project = await ProjectModel.findOne({
      $and: [
        { Name: payload.Name },
        { DeletedAt: null },
      ],
    });

    return project;
  } catch (error) {
    Errors.InternalServerError();
  }
}

async function getProjectById(payload) {
  try {
    const project = await ProjectModel.findOne({
      $and: [
        { _id: payload.ProjectId },
        { DeletedAt: null },
      ],
    });

    return project;
  } catch (error) {
    Errors.InternalServerError();
  }
}

async function getAllProjects() {
  try {
    const response = await ProjectModel.find(
        {
          DeletedAt: null,
        },
        {
          DeletedAt: 0,
          UpdatedAt: 0,
          CreatedAt: 0,
        },
    );
    return response;
  } catch (error) {
    Errors.InternalServerError();
  }
}

async function createNewProject(payload) {
  try {
    await ProjectModel.create({
      _id: uuidv4(),
      Name: payload.Name,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
    });
  } catch (error) {
    Errors.InternalServerError();
  }
}

async function updateProjectById(payload, _id) {
  try {
    await ProjectModel.findOneAndUpdate(
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

async function deleteProjectById(_id) {
  try {
    const response = await ProjectModel.findOneAndUpdate(
      { _id },
      { DeletedAt: new Date().toJSON() },
    );
    return response;
  } catch (error) {
    Errors.InternalServerError();
  }
}

module.exports = {
  getProjectById,
  getAllProjects,
  createNewProject,
  updateProjectById,
  deleteProjectById,
  existsProjectByName,
};