const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: String,
    phone: String,
    email: String,
    owner: {type: mongoose.SchemaTypes.ObjectId,  ref : "user"  }
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

contactSchema.plugin(mongoosePaginate);
const Contact = mongoose.model('contacts', contactSchema);

module.exports = Contact;
