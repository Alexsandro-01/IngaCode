const { loginSchema, checkPassword } = require('../validations/login');
const UserModel = require('../models/Users.model');
const Errors = require('../errors/Errors');
const jwt = require('../validations/jwt');

async function getUserOnDB(payload) {
  try {
    const user = await UserModel.findOne({
      $and: [
        { UserName: payload.UserName },
        { DeletedAt: null },
      ],
    });

    return user;
  } catch (error) {
    Errors.InternalServerError();
  }
}
  
  async function loginService(payload) {
    const parsedLoginData = loginSchema.safeParse(payload);
    
    if (!parsedLoginData.success) {
      throw parsedLoginData.error;
    }

    const user = await getUserOnDB(payload);

    if (!user) {
      Errors.BadRequest();
    }

    await checkPassword(payload.Password, user.Password);
    const token = await jwt.createTokenJwt({ user: user.UserName });

    return token;
}

module.exports = loginService;