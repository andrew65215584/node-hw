const fs = require('fs').promises;
const path = require('path');
const { v4 } = require('uuid');
const contactsPath = path.join(__dirname, '..', '..', '/db/contacts.json');

class ContactsService {
  constructor() {}

  async getAll() {
    const needInformation = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(needInformation);
  }

  async getContactById({ id }) {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const parseData = JSON.parse(data);
    const foundContacts = parseData.filter(el => el.id === id);
    return foundContacts;
  }

  async createContact({ name, email, phone }) {
    const id = v4();
    const newContact = {
      id,
      name,
      email,
      phone,
    };

    const data = await fs.readFile(contactsPath, 'utf-8');
    console.log('data', data);
    let parseData = JSON.parse(data);
    parseData = [...parseData, newContact];
    const strNewData = JSON.stringify(parseData);

    fs.writeFile(contactsPath, strNewData, err => {
      if (err) {
        console.log(err);
      }
    });

    return parseData;
  }

  async updateContact({ id }, body) {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const parseData = JSON.parse(data);
    const index = parseData.findIndex(el => el.id == id);

    if (index === -1) {
      return false;
    } else {
      parseData[index] = { ...parseData[index], ...body };

      await fs.writeFile(contactsPath, JSON.stringify(parseData));
      return parseData[index];
    }
  }

  async removeContact({ id }) {
    const data = await fs.readFile(contactsPath, 'utf-8');

    const parseData = JSON.parse(data);
    const foundContacts = parseData.filter(el => el.id !== Number(id));

    const strNewData = JSON.stringify(foundContacts);
    fs.writeFile(contactsPath, strNewData, err => {
      if (err) {
        console.log(err);
      }
    });
    return `Successfully deleted contact with id ${id}`;
  }
}

module.exports = ContactsService;
