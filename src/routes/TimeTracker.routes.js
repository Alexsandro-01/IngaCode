const { Router } = require('express');
const timeTrackerController = require('../controllers/TimeTracker.controller');

const timeTrackerRoute = Router();

timeTrackerRoute.post('/create', timeTrackerController);

module.exports = timeTrackerRoute;