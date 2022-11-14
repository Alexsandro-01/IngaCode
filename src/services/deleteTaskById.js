const TaskModel = require('../models/Tasks.model');
const Errors = require('../errors/Errors');

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

module.exports = deleteTaskById;