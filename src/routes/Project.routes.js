const { Router } = require('express');
const {
  createProjectController,
  getProjectController,
  updateProjectController,
  deleteProjectCOntroller,
} = require('../controllers/Project.controller');

const projectRoute = Router();

projectRoute.post('/create', createProjectController);
projectRoute.get('/get', getProjectController);
projectRoute.patch('/update/:projectId', updateProjectController);
projectRoute.delete('/delete/:projectId', deleteProjectCOntroller);

module.exports = projectRoute;