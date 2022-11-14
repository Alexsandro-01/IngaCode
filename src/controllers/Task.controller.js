const { 
  createTaskService,
  updateTaskService,
  getTasksService,
  deleteTaskService,
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

  res.sendStatus(204);
}

/** @type {import('express').RequestHandler} */
async function getTasksController(req, res) {
  const token = req.headers.authorization;

  const response = await getTasksService(token);

  res.status(200).json(response);
}

/** @type {import('express').RequestHandler} */
async function deleteTasksController(req, res) {
  const token = req.headers.authorization;
  const { taskId } = req.params;

  await deleteTaskService(taskId, token);

  res.sendStatus(204);
}

module.exports = {
  createTaskController,
  updateTaskController,
  getTasksController,
  deleteTasksController,
};