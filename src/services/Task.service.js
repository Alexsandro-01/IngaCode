/* eslint-disable no-underscore-dangle */
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
const { getAllTimeTrackersOnDB } = require('./TimeTracker.service');
const getAllCollaboratorsOnDB = require('./getAllCollaboratorsOnDB');
const getAllProjectsOnDB = require('./getAllProjectsOnDB');
const deleteTaskById = require('./deleteTaskById');
const timeTrackersByTaskId = require('./timeTrackersByTaskId');
const deleteTimeTrackersByTaskId = require('./deleteTimeTrackersByTaskId');

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

async function getAlltasksOnDB() {
  try {
    const response = await TaskModel.find(
    {
      DeletedAt: null,
    },
    {
      DeletedAt: 0,
      CreatedAt: 0,
      UpdatedAt: 0,
    },
);
    return response;
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

function joinTables(trackers, tasks, collaborators, projects) {
  const response = tasks.map((task) => {
    const timeTrackers = trackers.filter((value) => value.TaskId === task._id);
    
    const timeTrackersWithProjectName = timeTrackers.map((track) => {
      const [collaborator] = collaborators.filter((value) => value._id === track.CollaboratorId);

      return { ...track.toJSON(), CollaboratorName: collaborator._doc.Name };
    });
    
    let ProjectName;
    projects.forEach((project) => {
      if (project._id === task.ProjectId) {
        ProjectName = project.Name;
      }
    });

    return { ...task.toJSON(), ProjectName, TimeTrackers: timeTrackersWithProjectName };
  });
  
  return response;
}

async function getTasksService(token) {
  await authUser(token);

  const trackers = await getAllTimeTrackersOnDB();
  const tasks = await getAlltasksOnDB();
  const collaborators = await getAllCollaboratorsOnDB();
  const projects = await getAllProjectsOnDB();
  
  const response = joinTables(trackers, tasks, collaborators, projects);

  return response;
}

async function deleteTaskService(taskId, token) {
  await authUser(token);

  const deleted = await deleteTaskById(taskId);

  if (!deleted) {
    Errors.NotFound('Task not found');
  }

  const timeTrackersByTask = await timeTrackersByTaskId(taskId);

  if (timeTrackersByTask.length > 0) {
    await deleteTimeTrackersByTaskId(taskId);
  }
}

module.exports = {
  createTaskService,
  updateTaskService,
  getTasksService,
  deleteTaskService,
};