const projectService = require('../services/Project.service');

/** @type {import('express').RequestHandler} */
async function projectController(req, res) {
  const token = req.headers.authorization;
  const payload = req.body;

  await projectService(payload, token);

  res.sendStatus(201);
}

module.exports = projectController;