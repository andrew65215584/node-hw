const express = require('express')
const router = express.Router()
const controllerContacts = require('../../controllers/contacts');
const { validateCreateContact, validateUpdateContact } = require('../../validation/contacts');



router
  .get('/', controllerContacts.getAllContacts)
  .get('/:id', controllerContacts.getContactById)
  .post('/', validateCreateContact, controllerContacts.createContact)
  .put('/:id', validateUpdateContact, controllerContacts.updateContact)
  .delete('/:id', controllerContacts.removeContact);

module.exports = router