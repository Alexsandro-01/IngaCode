const ProjectModel = require('../models/Projects.model');
const Errors = require('../errors/Errors');

async function existsProjectById(payload) {
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

module.exports = existsProjectById;