const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: String,
    phone: String,
    email: String,
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Contact = mongoose.model('contacts', contactSchema);

module.exports = Contact;
