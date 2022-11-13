/* eslint-disable camelcase */
const zod = require('zod');

const timeTracker = zod.object({
  StartDate: zod.string({
    required_error: 'StartDate is required',
    invalid_type_error: 'StartDate must be a string',
  }),
  EndDate: zod.string().optional(),
  TimeZoneId: zod
  .string({
    required_error: 'TimeZoneId is required',
    invalid_type_error: 'TimeZoneId must be a string',
  })
  .max(36, { message: 'TimeZoneId must be 200 characters long' }),
  TaskId: zod
  .string({
    required_error: 'TaskId is required',
    invalid_type_error: 'TaskId must be a string',
  })
  .min(36, { message: 'TaskId must be 36 characters long' })
  .max(36, { message: 'TaskId must be 36 characters long' }),
  CollaboratorId: zod
  .string({
    invalid_type_error: 'CollaboratorId must be a string',
  })
  .min(36, { message: 'CollaboratorId must be 36 characters long' })
  .max(36, { message: 'CollaboratorId must be 36 characters long' })
  .optional(),
});

module.exports = timeTracker;