/* eslint-disable camelcase */
const zod = require('zod');

const projectSchema = zod.object({
  Name: zod
  .string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be a string',
  })
  .min(3, { message: 'Name must be 3 or more characters long' })
  .max(255, { message: 'Name must be 255 or less characters long' }),
});

module.exports = projectSchema;