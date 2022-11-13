const { v4: uuidv4 } = require('uuid');
const taskSchema = require('../validations/task');
const updateTaskSchema = require('../validations/updateTask');
const jwt = require('../validations/jwt');
const Errors = require('../errors/Errors');
const getUserOnDB = require('./getUserOnDB');
const TaskModel = require('../models/Tasks.model');
const existsProjectById = require('./existsprojectById');
const authUser = require('./authUserByToken');
const getTaskById = require('./getTaskById');

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

async function updateTaskById(payload, _id) {
  try {
    await TaskModel.findOneAndUpdate(
      { _id },
      {
        ...payload,
        UpdatedAt: new Date().toJSON(),
      },
    );
  } catch (error) {
    Errors.InternalServerError();
  }
}

async function createTaskService(payload, token) {
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

function validPayloadUpdateTask(payload) {
  if (
    !Object.prototype.hasOwnProperty.call(payload, 'Name')
    && !Object.prototype.hasOwnProperty.call(payload, 'Description') 
  ) {
    Errors.BadRequest('Name or Description is required');
  }

  const parsedTask = updateTaskSchema.safeParse(payload);

  if (!parsedTask.success) {
    throw parsedTask.error;
  }

  return parsedTask;
}

async function updateTaskService(payload, taskId, token) {
  await authUser(token);

  const parsedTask = validPayloadUpdateTask(payload);

  const task = await getTaskById(taskId);
  if (!task) {
    Errors.NotFound('Task not found');
  }

  await updateTaskById(parsedTask.data, taskId);
}

module.exports = {
  createTaskService,
  updateTaskService,
};