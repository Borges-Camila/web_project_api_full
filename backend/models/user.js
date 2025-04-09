import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const linkRegex = /^https?:\/\//;

async function validateHash(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'O e-mail informado é inválido.',
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      required: true,
      validate: {
        validator(validity) {
          return linkRegex.test(validity);
        },
        message: (props) => `'${props.value}' é um link inválido`,
      },
    },
  },
  {
    versionKey: false,
  },
);

userSchema.statics.findUserByCredentials =
  async function findUserByCredentials({ email, password }) {
    const user = await this.findOne({ email });
    if (!user) {
      return {
        error: `User ${email} and/or password was not found.`,
      };
    }
    const isPasswordValid = await validateHash(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new Error('Credentials are invalid.');
    }
    return { id: user._id };
  };

const UserModel = mongoose.model('users', userSchema);
export default UserModel;
