import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import validator from 'validator';
import {
  getUser,
  updateUserInfo,
  updateUserAvatar,
} from '../controllers/users.js';

const router = Router();

const urlValidator = (value, helpers) => {
  if (!validator.isURL(value)) {
    return helpers.error('string.uri');
  }
  return value;
};

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    _id: Joi.string().alphanum().length(24),
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});
const validateAvatarUpdate = celebrate({
  body: Joi.object().keys({
    _id: Joi.string().alphanum().length(24),
    avatar: Joi.string().custom(urlValidator).required(),
  }),
});

// procura os usuários

router.get('/me', async (request, response, next) => {
  try {
    const user = await getUser(request.user.id);
    return response.json(user);
  } catch (error) {
    next(error);
  }
});

// atualização de usuário (name, about)

router.patch(
  '/me',
  validateUserUpdate,
  async (request, response, next) => {
    try {
      const { name, about } = request.body;
      const userId = request.user.id;
      if (!userId) {
        return response
          .status(400)
          .json({ error: 'ID do usuário não fornecido' });
      }
      const updatedUserInfo = await updateUserInfo(userId, {
        name,
        about,
      });
      return response.status(200).json(updatedUserInfo);
    } catch (error) {
      next(error);
    }
  },
);

// atualização de usuário (avatar)

router.patch(
  '/me/avatar',
  validateAvatarUpdate,
  async (request, response, next) => {
    try {
      const { avatar } = request.body;
      const userId = request.user.id;
      if (!userId) {
        return response
          .status(400)
          .json({ error: 'ID do usuário não fornecido' });
      }
      const updatedUserAvatar = await updateUserAvatar(userId, {
        avatar,
      });
      return response.status(200).json(updatedUserAvatar);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
