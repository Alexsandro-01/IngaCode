/* eslint-disable no-underscore-dangle */
const taskSchema = require('../validations/task');
const updateTaskSchema = require('../validations/updateTask');
const jwt = require('../validations/jwt');
const Errors = require('../errors/Errors');
const authUser = require('./authUserByToken');

const TaskModel = require('../models/Tasks.model');
const UserModel = require('../models/Users.model');
const CollaboratorModel = require('../models/Collaborators.model');
const ProjectModel = require('../models/Projects.model');
const TimeTrackerModel = require('../models/TimeTrackers.model');

async function createTaskService(payload, token) {
  const parsedTask = taskSchema.safeParse(payload);

  if (!parsedTask.success) {
    throw parsedTask.error;
  }

  const userData = await jwt.veryfyTokenJwt(token);
  const user = await UserModel.getUserByName(userData);

  if (!user) {
    Errors.BadRequest();
  }

  const exists = await ProjectModel.getProjectById(parsedTask.data);
  if (!exists) {
    Errors.NotFound('The informed Project don\'t exists');
  }

  await TaskModel.createNewTask(parsedTask.data);
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

  const task = await TaskModel.getTaskById(taskId);
  if (!task) {
    Errors.NotFound('Task not found');
  }

  await TaskModel.updateTaskById(parsedTask.data, taskId);
}

function joinTables(trackers, tasks, collaborators, projects) {
  const response = tasks.map((task) => {
    const timeTrackers = trackers.filter((value) => value.TaskId === task._id);
    
    const timeTrackersWithProjectName = timeTrackers.map((track) => {
      const [collaborator] = collaborators.filter((value) => value._id === track.CollaboratorId);

      if (!collaborator) {
        return { ...track.toJSON() };
      }
      
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

  const trackers = await TimeTrackerModel.getAllTimeTrackers();
  const tasks = await TaskModel.getAlltasks();
  const collaborators = await CollaboratorModel.getAllCollaborators();
  const projects = await ProjectModel.getAllProjects();
  
  const response = joinTables(trackers, tasks, collaborators, projects);

  return response;
}

async function deleteTaskService(taskId, token) {
  await authUser(token);

  const deleted = await TaskModel.deleteTaskById(taskId);

  if (!deleted) {
    Errors.NotFound('Task not found');
  }

  const timeTrackersByTask = await TimeTrackerModel.getTimeTrackersByTaskId(taskId);

  if (timeTrackersByTask.length > 0) {
    await TimeTrackerModel.deleteTimeTrackersByTaskId(taskId);
  }
}

module.exports = {
  createTaskService,
  updateTaskService,
  getTasksService,
  deleteTaskService,
};