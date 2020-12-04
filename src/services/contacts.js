const {ContactsRepository} = require('../repository');

class ContactsService {
  constructor() {
    this.repositories = new ContactsRepository()
    ;
  }

  async getAll() {
    const data = await this.repositories.getAll();
    return data;
  }

  async getContactById({ id }) {
    
    const data = await this.repositories.getContactById(id);
    return data;
  }




  async createContact(body) {
  
    const data = await this.repositories.createContact(body);
    return data;
  }




  async updateContact({id}, body) {
    console.log('id in services', id)
    console.log('body in services', body)
    const data = await this.repositories.updateContact(id, body);
    return data;
  }

  async removeContact({ id }) {
    const data = await this.repositories.removeContact(id);
    return data;
  }
}
module.exports = ContactsService;
