const Errors = require('../errors/Errors');
const TimeTrackerModel = require('../models/TimeTrackers.model');
const TaskModel = require('../models/Tasks.model');
const CollaboratorModel = require('../models/Collaborators.model');

const { 
  checkTimetrackers,
  validDates,
  calcTotalTime,
  timeToCalcByDay,
  timeToCalcByMonth,
} = require('./timeTrackerhelpers');

const updateTimeTrackerSchema = require('../validations/updateTimeTracker');
const authUser = require('./authUserByToken');

async function createTimeTrackerService(payload, token) {
  const parsedTimeTracker = await validDates(payload);

  await authUser(token);

  if (payload.CollaboratorId) {
    const collaborator = await CollaboratorModel.getCollaboratorById(payload.CollaboratorId);
    if (!collaborator) Errors.BadRequest('Collaborator with CollaboratorId don\'t exists');
  }

  const exists = await TaskModel.getTaskById(parsedTimeTracker.data.TaskId);
  if (!exists) {
    Errors.NotFound('The informed Project don\'t exists');
  }

  await checkTimetrackers([payload.StartDate, payload.EndDate]);

  await TimeTrackerModel.createNewTimeTracker(parsedTimeTracker.data);
}

async function getTimeToday() {
  const trackers = await TimeTrackerModel.getAllTimeTrackers();
  const today = new Date().toJSON();
  const timeToCalc = timeToCalcByDay(trackers, [], today);
  const totalTime = calcTotalTime(timeToCalc);

  return totalTime;
}

async function getTimeMonth() {
  const trackers = await TimeTrackerModel.getAllTimeTrackers();
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

  const timeTracker = await TimeTrackerModel.getTimetrackerById(timeTrackerId);
  if (!timeTracker) {
    Errors.NotFound('TimeTracker not found');
  }

  // eslint-disable-next-line no-restricted-globals
  if (data.EndDate !== undefined && isNaN(Date.parse(data.EndDate))) {
    Errors.BadRequest(`${data.EndDate} must be a valid Date`);
  }

  if (!CollaboratorModel.getCollaboratorById(payload.CollaboratorId)) {
    Errors.NotFound('Collaborator not found');
  }

  await TimeTrackerModel.updateTimeTrackerById(data, timeTrackerId);
}

async function getTimeService(token) {
  await authUser(token);
  const today = await getTimeToday();
  const month = await getTimeMonth();

  return { today, month };
}

module.exports = {
  createTimeTrackerService,
  updateTimeTrackerService,
  getTimeService,
};