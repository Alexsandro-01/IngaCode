const createTimeTrackerService = require('../services/TimeTracker.service');

/** @type {import('express').RequestHandler} */
async function timeTrackerController(req, res) {
  const token = req.headers.authorization;
  const timeTrackerData = req.body;

  await createTimeTrackerService(timeTrackerData, token);

  res.sendStatus(201);
}

module.exports = timeTrackerController;