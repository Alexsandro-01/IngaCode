const { v4: uuidv4 } = require('uuid');
const projectSchema = require('../validations/project');
const jwt = require('../validations/jwt');
const Errors = require('../errors/Errors');
const getUserOnDB = require('./getUserOnDB');
const ProjectModel = require('../models/Projects.model');
const existsProject = require('./existsProject');

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

  const userData = await jwt.veryfyTokenJwt(token);
  const user = await getUserOnDB(userData);

  if (!user) {
    Errors.BadRequest();
  }
  const exists = await existsProject(parsedProject.data);

  if (exists) {
    Errors.Conflict('This Project name allread exists');
  }

  await createNewProjectOnDB(parsedProject.data);
}

module.exports = projectService;