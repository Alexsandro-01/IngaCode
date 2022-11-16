const projectSchema = require('../validations/project');
const Errors = require('../errors/Errors');
const authUser = require('./authUserByToken');

const TaskModel = require('../models/Tasks.model');
const ProjectModel = require('../models/Projects.model');
const TimeTrackerModel = require('../models/TimeTrackers.model');

async function createProjectService(payload, token) {
  const parsedProject = projectSchema.safeParse(payload);

  if (!parsedProject.success) {
    throw parsedProject.error;
  }

  await authUser(token);

  const exists = await ProjectModel.existsProjectByName(parsedProject.data);

  if (exists) {
    Errors.Conflict('This Project name allread exists');
  }

  await ProjectModel.createNewProject(parsedProject.data);
}

async function getProjectsService(token) {
  await authUser(token);

  const projects = await ProjectModel.getAllProjects();

  return projects;
}

async function updateProjectService(payload, projectId, token) {
  await authUser(token);

  const parsedProject = projectSchema.safeParse(payload);

  if (!parsedProject.success) {
    throw parsedProject.error;
  }

  const project = await ProjectModel.getProjectById({ ProjectId: projectId });
  if (!project) {
    Errors.NotFound('Project not found');
  }

  await ProjectModel.updateProjectById(parsedProject.data, projectId);
}

async function deleteProjectService(projectId, token) {
  await authUser(token);

  const exist = await ProjectModel.getProjectById({ ProjectId: projectId });
  
  if (!exist) {
    Errors.NotFound('Project not found');
  }

  await ProjectModel.deleteProjectById(projectId);

  const tasksByproject = await TaskModel.getTasksByProjectId(projectId);

  Promise.all(
    tasksByproject.map((task) => 
      // eslint-disable-next-line no-underscore-dangle
      TimeTrackerModel.deleteTimeTrackersByTaskId(task._id)),
  );

  await TaskModel.deleteTasksByProjectId(projectId);
}

module.exports = {
  createProjectService,
  updateProjectService,
  deleteProjectService,
  getProjectsService,
};