const express = require('express');

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).json({ message: 'Hello!' });
});

module.exports = app;