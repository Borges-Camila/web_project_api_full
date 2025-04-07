import mongoose, { Schema } from 'mongoose';

const linkRegex = /^https?:\/\//;

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator(validity) {
          return linkRegex.test(validity);
        },
        message: (props) => `'${props.value}' é um link inválido`,
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
  },
  {
    versionKey: false,
  },
);

const CardModel = mongoose.model('cards', cardSchema);
export default CardModel;
