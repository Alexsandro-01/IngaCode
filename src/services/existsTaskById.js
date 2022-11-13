const TaskModel = require('../models/Tasks.model');
const Errors = require('../errors/Errors');

async function existsTaskById(payload) {
  try {
    const task = await TaskModel.findOne({
      $and: [
        { _id: payload.TaskId },
        { DeletedAt: null },
      ],
    });

    return task;
  } catch (error) {
    Errors.InternalServerError();
  }
}

module.exports = existsTaskById;