const { Router } = require('express');
const {
  createTaskController,
  updateTaskController,
  getTasksController,
} = require('../controllers/Task.controller');

const taskRoute = Router();

taskRoute.get('/read', getTasksController);
taskRoute.post('/create', createTaskController);
taskRoute.post('/update/:taskId', updateTaskController);

module.exports = taskRoute;