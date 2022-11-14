const { Schema } = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const db = require('./connection');
const Errors = require('../errors/Errors');

const TimeTrackerSchema = new Schema(
{
  _id: String,
  StartDate: Date,
  EndDate: {
    type: Date,
    default: null,
  },
  TimeZoneId: String,
  TaskId: String,
  CollaboratorId: {
    type: String,
    default: null,
  },
  CreatedAt: Date,
  UpdatedAt: Date,
  DeletedAt: {
    type: Date,
    default: null,
  },
},
{
  versionKey: false,
},
);

const TimeTrackerModel = db.model('TimeTrackers', TimeTrackerSchema);

async function createNewTimeTracker(payload) {
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

async function getAllTimeTrackers() {
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

async function deleteTimeTrackersByTaskId(taskId) {
  try {
    const response = await TimeTrackerModel.updateMany(
      { TaskId: taskId },
      { $set: { DeletedAt: new Date().toJSON() } },
    );
    return response;
  } catch (error) {
    Errors.InternalServerError();
  }
}

async function getTimeTrackersByTaskId(taskId) {
  try {
    const response = TimeTrackerModel.find(
      { TaskId: taskId },
    );
    return response;
  } catch (error) {
    Errors.InternalServerError();
  }
}

module.exports = {
  getAllTimeTrackers,
  getTimetrackerById,
  createNewTimeTracker,
  updateTimeTrackerById,
  getTimeTrackersByTaskId,
  deleteTimeTrackersByTaskId,
};