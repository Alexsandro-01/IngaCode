const taskService = require('../services/Task.service');

/** @type {import('express').RequestHandler} */
async function taskController(req, res) {
  const token = req.headers.authorization;
  const taskData = req.body;

  await taskService(taskData, token);
  res.sendStatus(201);
}

module.exports = taskController;