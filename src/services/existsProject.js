const ProjectModel = require('../models/Projects.model');
const Errors = require('../errors/Errors');

async function existsProject(payload) {
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

module.exports = existsProject;