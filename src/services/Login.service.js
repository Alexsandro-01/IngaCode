const { loginSchema, checkPassword } = require('../validations/login');
const Errors = require('../errors/Errors');
const jwt = require('../validations/jwt');
const UserModel = require('../models/Users.model');
  
  async function loginService(payload) {
    const parsedLoginData = loginSchema.safeParse(payload);
    
    if (!parsedLoginData.success) {
      throw parsedLoginData.error;
    }

    const user = await UserModel.getUserByName(parsedLoginData.data);

    if (!user) {
      Errors.BadRequest();
    }

    await checkPassword(payload.Password, user.Password);
    const token = await jwt.createTokenJwt({ UserName: user.UserName });

    return token;
}

module.exports = loginService;