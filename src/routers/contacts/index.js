const express = require('express')
const router = express.Router()
const controllerContacts = require('../../controllers/contacts');
const { validateCreateContact, validateUpdateContact } = require('../../validation/contacts');

const guard = require('../../helpers/guard')

router
  .get('/',guard, controllerContacts.getAllContacts)
  .get('/:id',guard, controllerContacts.getContactById)
  .post('/',guard, validateCreateContact, controllerContacts.createContact)
  .put('/:id',guard, validateUpdateContact, controllerContacts.updateContact)
  .delete('/:id',guard, controllerContacts.removeContact);

module.exports = router