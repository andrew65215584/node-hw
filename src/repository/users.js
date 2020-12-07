const User = require('../schemas/user');

class UsersRepository {
  constructor() {
    this.model = User;
  }
  async create(body) {
    const user = new this.model(body);
    return user.save();
  }

  async updateToken(id, token) {
      await this.model.updateOne({_id : id}, {token})
  }

  async getUserById(id) {
    const result = await this.model.findOne({ _id: id });
    return result;
  }
  async getUserByEmail(email) {
    const result = await this.model.findOne({ email });
    return result;
  }

  async getAllUsers() {
    const results = await this.model.find({});
    return results;
  }
}

module.exports = UsersRepository;
