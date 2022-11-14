const Errors = require('../errors/Errors');
const timeTrackerSchema = require('../validations/timeTracker');
const TimeTrackerModel = require('../models/TimeTrackers.model');

async function getTimetrackers() {
  try {
    const response = await TimeTrackerModel.find({
      DeletedAt: null,
    });
    return response;
  } catch (error) {
    Errors.InternalServerError();
  }
}

function helperCheckTimetrackers(
  valueStatDate,
  valueEndDate,
  insertStartDate,
  insertEndDate,
) {
  if (insertStartDate <= valueEndDate && insertStartDate >= valueStatDate) {
    Errors.Conflict('Your StartDate collided with another time tracker.');
  }

  if (insertEndDate <= valueEndDate && insertEndDate >= valueStatDate) {
    Errors.Conflict('Your EndDate collided with another time tracker.');
  }
}

function calcTimeInterval(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const interval = new Date(end - start);

  const result = {
    hours: interval.getUTCHours(),
    minutes: interval.getUTCMinutes(),
    seconds: interval.getUTCSeconds(),
  };
  return result;
}

function calcTotalTime(timeDayList) {
  let h = 0;
  let m = 0;
  let s = 0;

  timeDayList.forEach(({ hours, minutes, seconds }) => {
    s += seconds;
    m += minutes;
    h += hours;
  });

  const hourInMinutes = Math.floor(m / 60);
  const minutes = hourInMinutes >= 1 ? (m - (hourInMinutes * 60)) : m;
  const hours = hourInMinutes >= 1 ? h + hourInMinutes : h;

  return { hours, minutes, seconds: s };
}

function filterByDay(trackers, insertStartDate) {
  const filteredDates = trackers.filter((tracker) => {
    const todayToFilter = new Date(insertStartDate).toJSON().slice(8, 10);
    const date = new Date(tracker.StartDate).toJSON().slice(8, 10);

    return date === todayToFilter;
  });
  return filteredDates;
}

function filterByMonth(trackers) {
  const filteredDates = trackers.filter((tracker) => {
    const monthToFilter = new Date().toJSON().slice(5, 7);
    const date = new Date(tracker.StartDate).toJSON().slice(5, 7);

    return date === monthToFilter;
  });
  return filteredDates;
}

function timeToCalcByDay(trackers, timeDayList, insertStartDate) {
  const filteredDates = filterByDay(trackers, insertStartDate);
  filteredDates.forEach((value) => {
    const now = new Date().toJSON();

    const valueEndDate = !value.EndDate ? now : value.EndDate.toJSON();
    const valueStatDate = value.StartDate.toJSON();

    timeDayList.push(calcTimeInterval(valueStatDate, valueEndDate));
  });

  return timeDayList;
}

function timeToCalcByMonth(trackers, timeDayList) {
  const filteredDates = filterByMonth(trackers);
  filteredDates.forEach((value) => {
    const now = new Date().toJSON();

    const valueEndDate = !value.EndDate ? now : value.EndDate.toJSON();
    const valueStatDate = value.StartDate.toJSON();

    timeDayList.push(calcTimeInterval(valueStatDate, valueEndDate));
  });

  return timeDayList;
}

async function checkTimetrackers(insertDate) {
  const trackers = await getTimetrackers();
  const timeDayList = [];

  const insertStartDate = insertDate[0];
  const insertEndDate = !insertDate[1] ? new Date().toJSON() : insertDate[1];
  timeDayList.push(calcTimeInterval(insertStartDate, insertEndDate));

  const timeToCalc = timeToCalcByDay(trackers, timeDayList, insertStartDate);

  const totalTime = calcTotalTime(timeToCalc);

  if (totalTime.hours >= 24) {
    Errors.BadRequest(
      'Total time trackers will transpass 24 hours on this date',
    ); 
}

  trackers.forEach((value) => {
    const now = new Date().toJSON();

    const valueEndDate = !value.EndDate ? now : value.EndDate.toJSON();
    const valueStatDate = value.StartDate.toJSON();

    helperCheckTimetrackers(valueStatDate, valueEndDate, insertStartDate, insertEndDate);
  });
}

async function validDates(payload) {
  const parsedTimeTracker = timeTrackerSchema.safeParse(payload);
  
  if (!parsedTimeTracker.success) throw parsedTimeTracker.error;

  if (payload.StartDate > payload.EndDate) {
    Error.BadRequest('StartDate can\'t bigger than EndDate');
  }
  
  const dates = [payload.StartDate, payload.EndDate];
  const keys = Object.keys(payload);
  dates.forEach((date, index) => {
    const timestamp = Date.parse(date);
    // eslint-disable-next-line no-restricted-globals
    if (date !== undefined && isNaN(timestamp)) {
      Errors.BadRequest(`${keys[index]} must be a valid Date`);
    }
  });

  return parsedTimeTracker;
}

module.exports = {
  checkTimetrackers,
  validDates,
  calcTotalTime,
  timeToCalcByDay,
  timeToCalcByMonth,
};