const { Router } = require('express');
const {
  createtimeTrackerController,
  updateTimeTrackerController,
} = require('../controllers/TimeTracker.controller');

const timeTrackerRoute = Router();

timeTrackerRoute.post('/create', createtimeTrackerController);
timeTrackerRoute.post('/update/:timeTrackerId', updateTimeTrackerController);

module.exports = timeTrackerRoute;