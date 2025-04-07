import mongoose from 'mongoose';

const linkRegex = /^https?:\/\//;

const userSchema = new mongoose.Schema(
  {
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

const UserModel = mongoose.model('users', userSchema);
export default UserModel;
