const loginService = require('../services/Login.service');

/** @type {import('express').RequestHandler */
async function loginController(req, res) {
  const userData = req.body;

  const response = await loginService(userData);

  res.status(200).json(response);
}

module.exports = loginController;