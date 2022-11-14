const { Router } = require('express');
const {
  createProjectController,
  updateProjectController,
  deleteProjectCOntroller,
} = require('../controllers/Project.controller');

const projectRoute = Router();

projectRoute.post('/create', createProjectController);
projectRoute.patch('/update/:projectId', updateProjectController);
projectRoute.delete('/delete/:projectId', deleteProjectCOntroller);

module.exports = projectRoute;