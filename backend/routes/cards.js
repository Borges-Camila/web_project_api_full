import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import validator from 'validator';
import {
  listCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards.js';

const router = Router();

const urlValidator = (value, helpers) => {
  if (!validator.isURL(value)) {
    return helpers.error('string.uri');
  }
  return value;
};

const validateCardCreation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(urlValidator),
  }),
});
const validateCardId = celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

// GET - procura os cards
router.get('/', async (request, response, next) => {
  try {
    const cards = await listCards();
    return response.json(cards);
  } catch (error) {
    next(error);
  }
});

// POST /cards — cria um novo cartão
router.post(
  '/',
  validateCardCreation,
  async (request, response, next) => {
    try {
      const { name, link } = request.body;
      // Obtendo ID do usuário da requisição
      const userId = request.user?.id;

      if (!userId) {
        return response
          .status(401)
          .json({ error: 'Usuário não autenticado' });
      }

      const createdCard = await createCard({ name, link }, userId);

      return response.status(201).json(createdCard);
    } catch (error) {
      next(error);
    }
  },
);

// DELETE /cards/:cardId — deleta um cartão por _id

router.delete(
  '/:cardId',
  validateCardId,
  async (request, response, next) => {
    try {
      const { cardId } = request.params;
      const userId = request.user?.id;

      // verifica o usuário
      if (!userId) {
        return response
          .status(401)
          .json({ error: 'Usuário não autenticado' });
      }

      const result = await deleteCard(cardId, userId);
      return response.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
);

// PUT /cards/:cardId/likes — curte um cartão

router.put(
  '/:cardId/likes',
  validateCardId,
  async (request, response, next) => {
    try {
      const { cardId } = request.params;
      const userId = request.user?.id;

      if (!userId) {
        return response
          .status(401)
          .json({ error: 'Usuário não autenticado' });
      }

      const updatedCard = await likeCard(cardId, userId);
      return response.status(200).json(updatedCard);
    } catch (error) {
      next(error);
    }
  },
);

// DELETE /cards/:cardId/likes — descurte um cartão

router.delete(
  '/:cardId/likes',
  validateCardId,
  async (request, response, next) => {
    try {
      const { cardId } = request.params;
      const userId = request.user?.id;

      if (!userId) {
        return response
          .status(401)
          .json({ error: 'Usuário não autenticado' });
      }

      const updatedCard = await dislikeCard(cardId, userId);
      return response.status(200).json(updatedCard);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
