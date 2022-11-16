const { Router } = require('express');
const { CollaboratorController } = require('../controllers/Login.controller');

const collaboratorsRoute = Router();

collaboratorsRoute.get('/', CollaboratorController);

module.exports = collaboratorsRoute;