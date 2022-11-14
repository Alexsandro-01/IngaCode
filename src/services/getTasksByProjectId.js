const TaskModel = require('../models/Tasks.model');
const Errors = require('../errors/Errors');

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

module.exports = getTasksByProjectId;