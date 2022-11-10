const { loginSchema, checkPassword } = require('../validations/login');
const UserModel = require('../models/Users.model');

async function loginService(payload) {
  const parsedLoginData = loginSchema.safeParse(payload);

  if (!parsedLoginData.success) {
    throw parsedLoginData.error;
  }

  const user = await UserModel.findOne(
    {
      where: { UserName: payload.UserName },
    },
  );

  if (checkPassword(payload.Password, user.Password)) {
    return user;
  }
}

module.exports = loginService;