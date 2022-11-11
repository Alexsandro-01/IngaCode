const { Router } = require('express');
const projectController = require('../controllers/Project.controller');

const projectRoute = Router();

projectRoute.post('/create', projectController);

module.exports = projectRoute;