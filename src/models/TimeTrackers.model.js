const { Schema } = require('mongoose');
const db = require('./connection');

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

module.exports = TimeTrackerModel;