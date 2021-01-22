const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// const { string } = require('joi');
const { Schema } = mongoose;
const { Gender } = require('../helpers/constants');

const SALT_FACTOR = 6;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      default: 'Guest',
    },
    gender: {
      type: String,
      enum: {
        values: [Gender.Male, Gender.FEMALE, Gender.NONE],
        message: 'This gender is not allowed',
      },
      default: Gender.NONE,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email must be unique'],
    },
    avatarURL: {
      type: String,
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
    },

    token: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password ')) return next();

  this.password = await bcrypt.hash(
    this.password,
    bcrypt.genSaltSync(SALT_FACTOR),
  );
  next();
});

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('user', userSchema);

module.exports = User;
