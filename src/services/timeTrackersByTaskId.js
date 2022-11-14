const TimeTrackerModel = require('../models/TimeTrackers.model');
const Errors = require('../errors/Errors');

async function getTimeTrackersByTaskId(taskId) {
  try {
    const response = TimeTrackerModel.find(
      { TaskId: taskId },
    );
    return response;
  } catch (error) {
    Errors.InternalServerError();
  }
}

module.exports = getTimeTrackersByTaskId;