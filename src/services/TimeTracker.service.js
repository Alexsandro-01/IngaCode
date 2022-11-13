const { v4: uuidv4 } = require('uuid');
const jwt = require('../validations/jwt');
const Errors = require('../errors/Errors');
const getUserOnDB = require('./getUserOnDB');
const TimeTrackerModel = require('../models/TimeTrackers.model');
const existsTaskById = require('./existsTaskById');
const getCollaboratorById = require('./getCollaboratorById');
const { checkTimetrackers, validDates } = require('./timeTrackerhelpers');

async function createNewTimeTrackerOnDB(payload) {
  try {
    await TimeTrackerModel.create({
      _id: uuidv4(),
      ...payload,
      CreatedAt: new Date().toUTCString(),
      UpdatedAt: new Date().toUTCString(),
    });
  } catch (error) {
    Errors.InternalServerError();
  }
}

async function createTimeTrackerService(payload, token) {
  await validDates(payload);

  const userData = await jwt.veryfyTokenJwt(token);
  const user = await getUserOnDB(userData);

  if (!user) {
    Errors.BadRequest();
  }

  if (payload.CollaboratorId) {
    const collaborator = await getCollaboratorById(payload.CollaboratorId);
    if (!collaborator) Errors.BadRequest('Collaborator with CollaboratorId don\'t exists');
  }

  const exists = await existsTaskById(payload);
  if (!exists) {
    Errors.NotFound('The informed Project don\'t exists');
  }

  await checkTimetrackers([payload.StartDate, payload.EndDate]);

  await createNewTimeTrackerOnDB(payload);
}

module.exports = createTimeTrackerService;