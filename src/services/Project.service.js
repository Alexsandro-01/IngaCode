const { v4: uuidv4 } = require('uuid');
const projectSchema = require('../validations/project');
const Errors = require('../errors/Errors');
const ProjectModel = require('../models/Projects.model');
const existsProject = require('./existsProject');
const existsProjectById = require('./existsprojectById');
const authUser = require('./authUserByToken');
const deleteTasksByProjectId = require('./deleteTasksByProjectId');
const getTasksByProjectId = require('./getTasksByProjectId');
const deleteTimeTrackersByTaskId = require('./deleteTimeTrackersByTaskId');
const getAllProjectsOnDB = require('./getAllProjectsOnDB');

async function createNewProjectOnDB(payload) {
  try {
    await ProjectModel.create({
      _id: uuidv4(),
      Name: payload.Name,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
    });
  } catch (error) {
    Errors.InternalServerError();
  }
}

async function getProjectById(_id) {
  try {
    const response = await ProjectModel.findOne({
      _id,
    });
    return response;
  } catch (error) {
    Errors.InternalServerError();
  }
}

async function updateProjectById(payload, _id) {
  try {
    await ProjectModel.findOneAndUpdate(
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

async function deleteProjectById(_id) {
  try {
    const response = await ProjectModel.findOneAndUpdate(
      { _id },
      { DeletedAt: new Date().toJSON() },
    );
    return response;
  } catch (error) {
    Errors.InternalServerError();
  }
}

async function createProjectService(payload, token) {
  const parsedProject = projectSchema.safeParse(payload);

  if (!parsedProject.success) {
    throw parsedProject.error;
  }

  await authUser(token);

  const exists = await existsProject(parsedProject.data);

  if (exists) {
    Errors.Conflict('This Project name allread exists');
  }

  await createNewProjectOnDB(parsedProject.data);
}

async function getProjectsService(token) {
  await authUser(token);

  const projects = await getAllProjectsOnDB();

  return projects;
}

async function updateProjectService(payload, projectId, token) {
  await authUser(token);

  const parsedProject = projectSchema.safeParse(payload);

  if (!parsedProject.success) {
    throw parsedProject.error;
  }

  const project = await getProjectById(projectId);
  if (!project) {
    Errors.NotFound('Project not found');
  }

  await updateProjectById(parsedProject.data, projectId);
}

async function deleteProjectService(projectId, token) {
  await authUser(token);

  const exist = await existsProjectById({ ProjectId: projectId });
  
  if (!exist) {
    Errors.NotFound('Project not found');
  }

  await deleteProjectById(projectId);

  const tasksByproject = await getTasksByProjectId(projectId);

  Promise.all(
    tasksByproject.map((task) => 
      // eslint-disable-next-line no-underscore-dangle
       deleteTimeTrackersByTaskId(task._id)),
  );

  await deleteTasksByProjectId(projectId);
}

module.exports = {
  createProjectService,
  updateProjectService,
  deleteProjectService,
  getProjectsService,
};