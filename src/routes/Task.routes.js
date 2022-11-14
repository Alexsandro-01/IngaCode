const { Router } = require('express');
const {
  createTaskController,
  updateTaskController,
  getTasksController,
  deleteTasksController,
} = require('../controllers/Task.controller');

const taskRoute = Router();

taskRoute.get('/get', getTasksController);
taskRoute.post('/create', createTaskController);
taskRoute.patch('/update/:taskId', updateTaskController);
taskRoute.delete('/delete/:taskId', deleteTasksController);

module.exports = taskRoute;