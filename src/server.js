const express = require('express');
const loginRoute = require('./routes/Login.routes');

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).json({ message: 'Hello!' });
});

app.use('/login', loginRoute);

module.exports = app;