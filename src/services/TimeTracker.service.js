const { v4: uuidv4 } = require('uuid');
const Errors = require('../errors/Errors');
const TimeTrackerModel = require('../models/TimeTrackers.model');
const existsTaskById = require('./existsTaskById');
const getCollaboratorById = require('./getCollaboratorById');
const { 
  checkTimetrackers,
  validDates,
  calcTotalTime,
  timeToCalcByDay,
  timeToCalcByMonth,
} = require('./timeTrackerhelpers');
const updateTimeTrackerSchema = require('../validations/updateTimeTracker');
const authUser = require('./authUserByToken');

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
  try {
    const timeTrackers = await TimeTrackerModel.find(
    {
      DeletedAt: null,
    },
    {
      DeletedAt: 0,
      UpdatedAt: 0,
      CreatedAt: 0,
    },
);
  
    return timeTrackers;
  } catch (error) {
    Errors.InternalServerError();    
  }
}

async function getTimetrackerById(_id) {
  try {
    const timeTracker = await TimeTrackerModel.findOne(
      {
        $and: [
          { _id },
          { DeletedAt: null },
        ],
      },
    );
    return timeTracker;
  } catch (error) {
    Errors.InternalServerError();
  }
}

async function updateTimeTrackerById(payload, _id) {
  try {
    const response = await TimeTrackerModel.findOneAndUpdate(
      { _id },
      {
        ...payload,
        UpdatedAt: new Date().toJSON(),
      },
    );
  
    return response;
  } catch (error) {
    Errors.InternalServerError();
  }
}

async function createTimeTrackerService(payload, token) {
  const parsedTimeTracker = await validDates(payload);

  await authUser(token);

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
  const totalTime = calcTotalTime(timeToCalc);

  return totalTime;
}

async function getTimeMonth() {
  const trackers = await getAllTimeTrackersOnDB();
  const timeToCalc = timeToCalcByMonth(trackers, []);
  const totalTime = calcTotalTime(timeToCalc);

  return totalTime;
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

async function getTimeService(token) {
  await authUser(token);
  const today = await getTimeToday();
  const month = await getTimeMonth();

  return {
    today,
    month,
  };
}

module.exports = {
  createTimeTrackerService,
  updateTimeTrackerService,
  getAllTimeTrackersOnDB,
  getTimeService,
};