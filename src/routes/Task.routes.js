const { Router } = require('express');
const {
  createTaskController,
  updateTaskController,
} = require('../controllers/Task.controller');

const taskRoute = Router();

taskRoute.post('/create', createTaskController);
taskRoute.post('/update/:taskId', updateTaskController);

module.exports = taskRoute;