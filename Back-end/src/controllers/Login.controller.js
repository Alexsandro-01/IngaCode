const { loginService, CollaboratorService } = require('../services/Login.service');

/** @type {import('express').RequestHandler} */
async function loginController(req, res) {
  const userData = req.body;

  const response = await loginService(userData);

  res.status(200).json({ token: response });
}

/** @type {import('express').RequestHandler} */
async function CollaboratorController(req, res) {
  const token = req.headers.authorization;

  const response = await CollaboratorService(token);

  res.status(200).json(response);
}

module.exports = {
  loginController,
  CollaboratorController,
};