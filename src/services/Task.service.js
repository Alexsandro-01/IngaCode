const { v4: uuidv4 } = require('uuid');
const taskSchema = require('../validations/task');
const jwt = require('../validations/jwt');
const Errors = require('../errors/Errors');
const getUserOnDB = require('./getUserOnDB');
const TaskModel = require('../models/Tasks.model');
const existsProjectById = require('./existsprojectById');

async function createNewTaskOnDB(payload) {
  try {
    await TaskModel.create({
      _id: uuidv4(),
      Name: payload.Name,
      Description: payload.Description,
      ProjectId: payload.ProjectId,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
    });
  } catch (error) {
    Errors.InternalServerError();
  }
}

async function taskService(payload, token) {
  const parsedTask = taskSchema.safeParse(payload);

  if (!parsedTask.success) {
    throw parsedTask.error;
  }

  const userData = await jwt.veryfyTokenJwt(token);
  const user = await getUserOnDB(userData);

  if (!user) {
    Errors.BadRequest();
  }

  const exists = await existsProjectById(parsedTask.data);
  if (!exists) {
    Errors.NotFound('The informed Project don\'t exists');
  }

  await createNewTaskOnDB(parsedTask.data);
}

module.exports = taskService;