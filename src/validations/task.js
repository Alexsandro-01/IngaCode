/* eslint-disable camelcase */
const zod = require('zod');

const taskSchema = zod.object({
  Name: zod
  .string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  }),
  Description: zod
  .string({
    required_error: 'Description is required',
    invalid_type_error: 'Description must be a string',
  })
  .min(3, { message: 'Description must be 3 or more characters long' }),
  ProjectId: zod
  .string({
    required_error: 'ProjectId is required',
    invalid_type_error: 'ProjectId must be a string',
  })
  .min(36, { message: 'ProjectId must be 36 characters long' })
  .max(36, { message: 'ProjectId must be 36 characters long' }),
});

module.exports = taskSchema;