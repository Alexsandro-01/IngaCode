const { Router } = require('express');
const taskController = require('../controllers/Task.controller');

const taskRoute = Router();

taskRoute.post('/create', taskController);

module.exports = taskRoute;