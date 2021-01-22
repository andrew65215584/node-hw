const {  UserService } = require('../services');
const { HttpCode } = require('../helpers/constants');
const serviceUser = new UserService();

const showPublicImage = async (req, res, next) => {

  try {

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
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


module.exports = {
  showPublicImage,
};
