const {ContactsRepository} = require('../repository');

class ContactsService {
  constructor() {
    this.repositories = {
      contacts: new ContactsRepository(),
    };
  }

  async getAll() {
    const data = await this.repositories.contacts.getAll();
    return data;
  }

  async getContactById({ id }) {
    const data = await this.repositories.contacts.getById(id);
    return data;
  }

  async createContact(body) {
   console.log('body', body)
    const data = await this.repositories.contacts.create(body);
    return data;
  }

  async updateContact({ id }, body) {
    const data = await this.repositories.contacts.update(id, body);
    return data;
  }

  async removeContact({ id }) {
    const data = await this.repositories.contacts.remove(id);
    return data;
  }
}
module.exports = ContactsService;
