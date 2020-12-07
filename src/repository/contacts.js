const Contact = require('../schemas/contacts');

class ContactsRepository {
  constructor() {
    this.model = Contact;
  }

  async getAll(userId, { limit = 11, offset = 0, sortBy, sortByDesc, filter }) {
    const { docs: contacts, totalDocs: total } = await this.model.paginate(
      { owner: userId },
      {
        limit,
        offset,
        sort: {
          ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
          ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
        },
        select: filter ? filter.split('|').join(' ') : '',
        populate: {
          path: 'owner',
          select: 'name email gender',
        },
      },
    );
    return { contacts, total, limit, offset };
  }

  async create(body, userId) {
    const result = await this.model.create({ ...body, owner: userId });
    return result;
  }

  async getContactById(userId, id) {
    const result = await this.model
      .findOne({ _id: id, owner: userId })
      .populate({
        path: 'owner',
        select: 'name email gender',
      });

    return result;
  }

  async updateContact(userId, id, body) {
    const result = await this.model.findByIdAndUpdate(
      { _id: id, owner: userId },
      { ...body },
      { new: true },
    );

    return result;
  }

  async removeContact(userId,id) {
    const result = await this.model.findByIdAndRemove({
      _id: id,
      owner: userId,
    });
    return result;
  }
}

module.exports = ContactsRepository;
