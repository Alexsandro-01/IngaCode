const { 
  createTimeTrackerService, 
  updateTimeTrackerService, 
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

  res.sendStatus(200);
}

module.exports = {
  createtimeTrackerController,
  updateTimeTrackerController,
};