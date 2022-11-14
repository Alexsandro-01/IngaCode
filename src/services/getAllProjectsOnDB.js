const ProjectModel = require('../models/Projects.model');
const Errors = require('../errors/Errors');

async function getAllProjectsOnDB() {
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

module.exports = getAllProjectsOnDB;