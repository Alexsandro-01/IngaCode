const express = require('express');
require('express-async-errors');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger_output.json');

const loginRoute = require('./routes/Login.routes');
const projectRoute = require('./routes/Project.routes');
const taskRoute = require('./routes/Task.routes');
const timeTrackerRoute = require('./routes/TimeTracker.routes');
const collaboratorsRoute = require('./routes/Collaborators.routes');

const ErrorMiddleware = require('./middlewares/ErrorMiddleware');

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.get('/', async (req, res) => {
  res.status(200).json({ message: 'Hello!' });
});

app.use('/login', loginRoute);
app.use('/collaborators', collaboratorsRoute);
app.use('/projects', projectRoute);
app.use('/tasks', taskRoute);
app.use('/timetrackers', timeTrackerRoute);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(ErrorMiddleware);

module.exports = app;