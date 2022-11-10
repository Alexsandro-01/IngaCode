const express = require('express');
require('express-async-errors');

const loginRoute = require('./routes/Login.routes');
const ErrorMiddleware = require('./middlewares/ErrorMiddleware');

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).json({ message: 'Hello!' });
});

app.use('/login', loginRoute);

app.use(ErrorMiddleware);

module.exports = app;