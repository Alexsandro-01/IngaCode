const { Router } = require('express');
const { loginController } = require('../controllers/Login.controller');

const loginRoute = Router();

loginRoute.post('/', loginController);

module.exports = loginRoute;