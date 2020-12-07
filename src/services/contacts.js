const { ContactsRepository } = require('../repository');

class ContactsService {
  constructor() {
    this.repositories = new ContactsRepository();
  }

  async getAll( userId ,query) {
    const data = await this.repositories.getAll(userId , query);
    return data;
  }

  async getContactById(userId, { id }) {
    const data = await this.repositories.getContactById(userId , id);
    return data;
  }

  async createContact(body, userId) {
    const data = await this.repositories.create(body, userId);
    return data;
  }

  async updateContact(userId ,{ id }, body) {
    const data = await this.repositories.updateContact(userId,id, body);

    return data;
  }

  async removeContact({ id }) {
    const data = await this.repositories.removeContact(id);
    return data;
  }
}
module.exports = ContactsService;
