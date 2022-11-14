const {
  createProjectService,
  updateProjectService,
  deleteProjectService,
  getProjectsService,
} = require('../services/Project.service');

/** @type {import('express').RequestHandler} */
async function createProjectController(req, res) {
  const token = req.headers.authorization;
  const payload = req.body;

  await createProjectService(payload, token);

  res.sendStatus(204);
}

/** @type {import('express').RequestHandler} */
async function getProjectController(req, res) {
  const token = req.headers.authorization;

  const projects = await getProjectsService(token);

  res.status(200).json(projects);
}

/** @type {import('express').RequestHandler} */
async function updateProjectController(req, res) {
  const token = req.headers.authorization;
  const { projectId } = req.params;
  const payload = req.body;

  await updateProjectService(payload, projectId, token);

  res.sendStatus(204);
}

/** @type {import('express').RequestHandler} */
async function deleteProjectCOntroller(req, res) {
  const token = req.headers.authorization;
  const { projectId } = req.params;

  await deleteProjectService(projectId, token);

  res.sendStatus(204);
}

module.exports = {
  createProjectController,
  getProjectController,
  updateProjectController,
  deleteProjectCOntroller,
};