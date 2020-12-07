const { AuthService, UserService } = require('../services');
const { HttpCode } = require('../helpers/constants');
const serviceUser = new UserService();
const serviceAuth = new AuthService();

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
    const newUser = await serviceUser.create({ name, email, password, gender });

    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        id: newUser.id,
        email: newUser.email,
        gender: newUser.gender,
        name: newUser.name,
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

module.exports = {
  reg,
  login,
  logout,
};
