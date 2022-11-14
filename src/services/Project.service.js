const { v4: uuidv4 } = require('uuid');
const projectSchema = require('../validations/project');
const Errors = require('../errors/Errors');
const ProjectModel = require('../models/Projects.model');
const existsProject = require('./existsProject');
const authUser = require('./authUserByToken');

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

async function projectService(payload, token) {
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

module.exports = projectService;