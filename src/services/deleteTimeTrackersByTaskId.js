const TimeTrackerModel = require('../models/TimeTrackers.model');
const Errors = require('../errors/Errors');

async function deleteTimeTrackersByTaskId(taskId) {
  try {
    const response = await TimeTrackerModel.update(
      { TaskId: taskId },
      { $set: { DeletedAt: new Date().toJSON() } },
    );
    return response;
  } catch (error) {
    Errors.InternalServerError();
  }
}

module.exports = deleteTimeTrackersByTaskId;