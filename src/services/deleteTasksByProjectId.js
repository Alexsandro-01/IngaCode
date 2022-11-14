const TaskModel = require('../models/Tasks.model');
const Errors = require('../errors/Errors');

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

module.exports = deleteTasksByProjectId;