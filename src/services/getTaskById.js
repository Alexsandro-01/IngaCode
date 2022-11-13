const TaskModel = require('../models/Tasks.model');
const Errors = require('../errors/Errors');

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

module.exports = getTaskById;