/* eslint-disable camelcase */
const zod = require('zod');
const bcrypt = require('bcrypt');

const loginSchema = zod.object({
  UserName: zod
  .string({
    required_error: 'UserName is required',
    invalid_type_error: 'UserName must be a string',
  })
  .min(3, { message: 'UserName must be 3 or more characters long' })
  .max(255, { message: 'UserName must be 255 or less characters long' }),
  Password: zod
  .string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  })
  .min(6, { message: 'Password must be 6 or more characters long' })
  .max(255, { message: 'UserName must be 255 or less characters long' }),
});

function checkPassword(plaintextPassword, hashPassword) {
  const isValid = bcrypt.compareSync(plaintextPassword, hashPassword);

  return isValid;
}

module.exports = {
  loginSchema,
  checkPassword,
};