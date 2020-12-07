const { HttpCode } = require('../helpers/constants');
const ContactsService = require('../services/contacts');

const contactsService = new ContactsService();

const createContact = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const contact = await contactsService.createContact(req.body, userId);

    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getAllContacts = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const contacts = await contactsService.getAll(userId, req.query);
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        ...contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const contact = await contactsService.getContactById(userId , req.params);

    if (contact) {
      res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not Found Contact',
        data: 'Not Found',
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
        const userId = req.user.id;

    const contact = await contactsService.getContactById(userId , req.params);

    if (contact.length === 0) {
      return res.status(400).send('{ "message": "Not found" }');
    }
    const updateContact = await contactsService.updateContact(
      req.params,
      req.body,
    );

    return res.status(200).send(updateContact);
  } catch (error) {
    next(error);
  }
};
const removeContact = async (req, res, next) => {
  try {
            const userId = req.user.id;

    const contact = await contactsService.removeContact(userId , req.params);
    if (contact) {
      res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { message: 'contact deleted' },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not Found Contact',
        data: 'Not Found',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
};
