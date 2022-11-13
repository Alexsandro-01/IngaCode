const { v4: uuidv4 } = require('uuid');
const jwt = require('../validations/jwt');
const Errors = require('../errors/Errors');
const getUserOnDB = require('./getUserOnDB');
const TimeTrackerModel = require('../models/TimeTrackers.model');
const existsTaskById = require('./existsTaskById');
const getCollaboratorById = require('./getCollaboratorById');
const { 
  checkTimetrackers,
  validDates,
  calcTotalTimeDay,
  timeToCalcByDay,
} = require('./timeTrackerhelpers');
const updateTimeTrackerSchema = require('../validations/updateTimeTracker');

async function authUser(token) {
  const userData = await jwt.veryfyTokenJwt(token);
  const user = await getUserOnDB(userData);

  if (!user) {
    Errors.BadRequest();
  }
}

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

async function getAllTimeTrackersOnDB() {
  const timeTrackers = await TimeTrackerModel.find({
    where: { DeletedAt: null },
  });

  return timeTrackers;
}

async function getTimetrackerById(_id) {
  const timeTracker = await TimeTrackerModel.findById(_id);
  return timeTracker;
}

async function updateTimeTrackerById(payload, _id) {
  const response = await TimeTrackerModel.findOneAndUpdate(
    { _id },
    {
      ...payload,
      UpdatedAt: new Date().toJSON(),
    },
  );

  return response;
}

async function createTimeTrackerService(payload, token) {
  const parsedTimeTracker = await validDates(payload);

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

  await createNewTimeTrackerOnDB(parsedTimeTracker.data);
}

async function getTimeToday() {
  const trackers = await getAllTimeTrackersOnDB();
  const today = new Date().toJSON();
  const timeToCalc = timeToCalcByDay(trackers, [], today);
  const totalTime = calcTotalTimeDay(timeToCalc);

  console.log(totalTime);
}

function validPayloadUpdateTimeTracker(payload) {
  if (
    !Object.prototype.hasOwnProperty.call(payload, 'EndDate')
    && !Object.prototype.hasOwnProperty.call(payload, 'CollaboratorId') 
  ) {
    Errors.BadRequest('EndDate or CollaboratorId is required');
  }

  const parsedTimeTracker = updateTimeTrackerSchema.safeParse(payload);

  if (!parsedTimeTracker.success) {
    throw parsedTimeTracker.error;
  }

  return parsedTimeTracker;
}

async function updateTimeTrackerService(payload, timeTrackerId, token) {
  await authUser(token);
  
  const { data } = validPayloadUpdateTimeTracker(payload);

  const timeTracker = await getTimetrackerById(timeTrackerId);
  if (!timeTracker) {
    Errors.NotFound('TimeTracker not found');
  }

  // eslint-disable-next-line no-restricted-globals
  if (data.EndDate !== undefined && isNaN(Date.parse(data.EndDate))) {
    Errors.BadRequest(`${data.EndDate} must be a valid Date`);
  }

  if (!getCollaboratorById(payload.CollaboratorId)) {
    Errors.NotFound('Collaborator not found');
  }

  await updateTimeTrackerById(data, timeTrackerId);
}

module.exports = {
  createTimeTrackerService,
  updateTimeTrackerService,
  getTimeToday,
};