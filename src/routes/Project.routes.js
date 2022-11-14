const { Router } = require('express');
const {
  createProjectController,
  updateProjectController,
} = require('../controllers/Project.controller');

const projectRoute = Router();

projectRoute.post('/create', createProjectController);
projectRoute.patch('/update/:projectId', updateProjectController);

module.exports = projectRoute;