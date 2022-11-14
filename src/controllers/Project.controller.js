const {
  createProjectService,
  updateProjectService,
} = require('../services/Project.service');

/** @type {import('express').RequestHandler} */
async function createProjectController(req, res) {
  const token = req.headers.authorization;
  const payload = req.body;

  await createProjectService(payload, token);

  res.sendStatus(204);
}

/** @type {import('express').RequestHandler} */
async function updateProjectController(req, res) {
  const token = req.headers.authorization;
  const { projectId } = req.params;
  const payload = req.body;

  await updateProjectService(payload, projectId, token);

  res.sendStatus(204);
}

module.exports = {
  createProjectController,
  updateProjectController,
};