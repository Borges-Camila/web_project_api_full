import { Router } from 'express';
import {
  listCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards.js';

const router = Router();

// GET - procura os cards
router.get('/', async (request, response) => {
  try {
    const cards = await listCards();
    return response.json(cards);
  } catch (error) {
    console.log(error);
    return response.status(404).json({
      error: 'ERROR: Não foi possivel encontrar os cartões',
    });
  }
});

// POST /cards — cria um novo cartão
router.post('/', async (request, response) => {
  try {
    const { name, link } = request.body;
    // Obtendo ID do usuário da requisição
    const userId = request.user?._id;

    if (!userId) {
      return response
        .status(401)
        .json({ error: 'Usuário não autenticado' });
    }

    const createdCard = await createCard({ name, link }, userId);

    return response.status(201).json(createdCard);
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      error: 'ERROR: Não foi possível criar um novo cartão',
    });
  }
});

// DELETE /cards/:cardId — deleta um cartão por _id

router.delete('/:cardId', async (request, response) => {
  try {
    const { cardId } = request.params;
    const userId = request.user?._id;

    // verifica o usuário
    if (!userId) {
      return response
        .status(401)
        .json({ error: 'Usuário não autenticado' });
    }

    const result = await deleteCard(cardId, userId);
    return response.status(200).json(result);
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      error: 'ERROR: Não foi possível deletar o cartão',
    });
  }
});

// PUT /cards/:cardId/likes — curte um cartão

router.put('/:cardId/likes', async (request, response) => {
  try {
    const { cardId } = request.params;
    const userId = request.user?._id;

    if (!userId) {
      return response
        .status(401)
        .json({ error: 'Usuário não autenticado' });
    }

    const updatedCard = await likeCard(cardId, userId);
    return response.status(200).json(updatedCard);
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      error: 'ERROR: Não foi possível curtir o cartão',
    });
  }
});

// DELETE /cards/:cardId/likes — descurte um cartão

router.delete('/:cardId/likes', async (request, response) => {
  try {
    const { cardId } = request.params;
    const userId = request.user?._id;

    if (!userId) {
      return response
        .status(401)
        .json({ error: 'Usuário não autenticado' });
    }

    const updatedCard = await dislikeCard(cardId, userId);
    return response.status(200).json(updatedCard);
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      error: 'ERROR: Não foi possível descurtir o cartão',
    });
  }
});

export default router;
