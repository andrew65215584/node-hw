const { AuthService, UserService, EmailService } = require('../services');
const UsersRepository = require('../repository/users');
const { HttpCode } = require('../helpers/constants');
const serviceUser = new UserService();
const serviceAuth = new AuthService();
const serviceEmail = new EmailService();
const userRepository = new UsersRepository();

const { v4 } = require('uuid');
const reg = async (req, res, next) => {
  const { name, email, password, gender } = req.body;

  const user = await serviceUser.findByEmail(email);

  if (user) {
    return next({
      status: HttpCode.CONFLICT,
      data: 'Conflict',
      message: 'This email is already use',
    });
  }

  try {
    const newUser = await serviceUser.create({
      name,
      email,
      password,
      gender,
      token: v4(),
    });

    const answerSendGrid = await serviceEmail.sendVerificationEmail(
      email,
      newUser.token,
    );

    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        gender: newUser.gender,
        name: newUser.name,
        isVerified: newUser.isVerified,
      },
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const token = await serviceAuth.loginService({ email, password });

    if (token) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          token,
        },
      });
    }
    next({
      status: HttpCode.UNAUTHORIZED,
      message: 'Invalid credentials',
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  const id = req.user.id;
  await serviceAuth.logout(id);
  return res
    .status(HttpCode.NO_CONTENT)
    .json({ status: 'success', code: HttpCode.NO_CONTENT });
};

const verifiedTokenAfterRegister = async (req, res, next) => {
  try {
    const { token } = req.params;

    const user = await userRepository.findByToken(token);
    if (!user) {
      return res.status(400).send({
        success: false,
        message: 'User doesnt exist',
      });
    }

    if (user) {
      if (!user.isVerified) {
        user.isVerified = true;
        await user.save();

        return res.status(200).send({
          success: true,
          message: 'user verified successfully',
        });
      } else {
        return res.send({
          message: 'You have already verified this email',
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  reg,
  login,
  logout,
  verifiedTokenAfterRegister,
};
