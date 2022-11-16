const { 
  createTimeTrackerService, 
  updateTimeTrackerService,
  deleteTimeTrackerService,
  getTimeService,
} = require('../services/TimeTracker.service');

/** @type {import('express').RequestHandler} */
async function createtimeTrackerController(req, res) {
  const token = req.headers.authorization;
  const timeTrackerData = req.body;

  await createTimeTrackerService(timeTrackerData, token);

  res.sendStatus(204);
}

/** @type {import('express').RequestHandler} */
async function updateTimeTrackerController(req, res) {
  const { timeTrackerId } = req.params;
  const token = req.headers.authorization;
  const payload = req.body;

  await updateTimeTrackerService(payload, timeTrackerId, token);

  res.sendStatus(204);
}

/** @type {import('express').RequestHandler} */
async function getTimeController(req, res) {
  const token = req.headers.authorization;

  const time = await getTimeService(token);

  res.status(200).json(time);
}

/** @type {import('express').RequestHandler} */
async function deleteTimetrackerController(req, res) {
  const token = req.headers.authorization;
  const { timeTrackerId } = req.params;
  
  await deleteTimeTrackerService(timeTrackerId, token);

  res.sendStatus(204);
}

module.exports = {
  createtimeTrackerController,
  updateTimeTrackerController,
  deleteTimetrackerController,
  getTimeController,
};