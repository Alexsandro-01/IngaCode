const { Router } = require('express');
const projectController = require('../controllers/Project.controller');

const loginRoute = Router();

loginRoute.post('/create', projectController);

module.exports = loginRoute;