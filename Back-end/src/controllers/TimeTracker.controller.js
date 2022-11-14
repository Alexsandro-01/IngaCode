const { 
  createTimeTrackerService, 
  updateTimeTrackerService,
  getTimeService,
} = require('../services/TimeTracker.service');

/** @type {import('express').RequestHandler} */
async function createtimeTrackerController(req, res) {
  const token = req.headers.authorization;
  const timeTrackerData = req.body;

  await createTimeTrackerService(timeTrackerData, token);

  res.sendStatus(201);
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

module.exports = {
  createtimeTrackerController,
  updateTimeTrackerController,
  getTimeController,
};