const projectService = require('../services/Project.service');

/** @type {import('express').RequestHandler} */
async function projectController(req, res) {
  const token = req.headers.authorization;
  const payload = req.body;

  const response = await projectService(payload, token);

  res.status(201).json(response);
}

module.exports = projectController;