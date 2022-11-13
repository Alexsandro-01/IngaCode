/* eslint-disable camelcase */
const zod = require('zod');

const updateTaskSchema = zod.object({
  Name: zod
  .string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  })
  .min(3, { message: 'Name must be 3 or more characters long' })
  .optional(),
  Description: zod
  .string({
    required_error: 'Description is required',
    invalid_type_error: 'Description must be a string',
  })
  .min(3, { message: 'Description must be 3 or more characters long' })
  .optional(),
});

module.exports = updateTaskSchema;