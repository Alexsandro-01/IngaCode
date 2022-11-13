const { 
  createTaskService,
  updateTaskService,
  getTasksService,
 } = require('../services/Task.service');

/** @type {import('express').RequestHandler} */
async function createTaskController(req, res) {
  const token = req.headers.authorization;
  const taskData = req.body;

  await createTaskService(taskData, token);
  res.sendStatus(201);
}

/** @type {import('express').RequestHandler} */
async function updateTaskController(req, res) {
  const { taskId } = req.params;
  const token = req.headers.authorization;
  const taskData = req.body;

  await updateTaskService(taskData, taskId, token);

  res.sendStatus(200);
}

/** @type {import('express').RequestHandler} */
async function getTasksController(req, res) {
  const token = req.headers.authorization;

  const response = await getTasksService(token);

  res.status(200).json(response);
}

module.exports = {
  createTaskController,
  updateTaskController,
  getTasksController,
};