/* eslint-disable camelcase */
const zod = require('zod');

const timeTrackerSchema = zod.object({
  EndDate: zod.string().optional(),
  CollaboratorId: zod
  .string({
    invalid_type_error: 'CollaboratorId must be a string',
  })
  .min(36, { message: 'CollaboratorId must be 36 characters long' })
  .max(36, { message: 'CollaboratorId must be 36 characters long' })
  .optional(),
});

module.exports = timeTrackerSchema;