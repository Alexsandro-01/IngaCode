const { Router } = require('express');
const {
  createtimeTrackerController,
  updateTimeTrackerController,
  getTimeController,
} = require('../controllers/TimeTracker.controller');

const timeTrackerRoute = Router();

timeTrackerRoute.post('/create', createtimeTrackerController);
timeTrackerRoute.get('/get-time', getTimeController);
timeTrackerRoute.patch('/update/:timeTrackerId', updateTimeTrackerController);

module.exports = timeTrackerRoute;