import CardModel from '../models/card.js';

// busca os cartões
async function listCards() {
  try {
    const cards = await CardModel.find();
    return cards;
  } catch (error) {
    throw new Error(
      'Não foi possivel encontrar os cartºoes',
    ).mongoError('Mongo - get cards');
  }
}

// cards — cria um novo cartão
async function createCard(items, userId) {
  try {
    const { name, link } = items;

    if (!name || !link) {
      throw new Error('Nome e link são obrigatórios');
    }

    const newCard = new CardModel({ name, link, owner: userId });
    const createdCard = await newCard.save();

    return createdCard;
  } catch (error) {
    throw new Error('Não foi possível criar o cartão');
  }
}

// Deletar  cartão
async function deleteCard(cardId, userId) {
  try {
    const card = await CardModel.findById(cardId).orFail(() => {
      const error = new Error('Cartão não encontrado');
      error.statusCode = 404;
      throw error;
    });

    if (card.owner.toString() !== userId) {
      throw new Error(
        'Você não tem permissão para deletar este cartão',
      );
    }

    await CardModel.findByIdAndDelete(cardId);
    return { message: 'Cartão foi deletado com sucesso' };
  } catch (error) {
    console.error('Erro ao deletar cartão:', error);
    throw new Error(
      error.statusCode === 404
        ? 'Cartão não encontrado'
        : 'Não foi possível deletar o cartão',
    );
  }
}

// Curtir  cartão
async function likeCard(cardId, userId) {
  try {
    const card = await CardModel.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    ).orFail(() => {
      const error = new Error('Cartão não encontrado');
      error.statusCode = 404;
      throw error;
    });

    return card;
  } catch (error) {
    console.error('Erro ao curtir cartão:', error);
    throw new Error(
      error.statusCode === 404
        ? 'Cartão não encontrado'
        : 'Não foi possível curtir o cartão',
    );
  }
}

// Descurtir  cartão
async function dislikeCard(cardId, userId) {
  try {
    const card = await CardModel.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true },
    ).orFail(() => {
      const error = new Error('Cartão não encontrado');
      error.statusCode = 404;
      throw error;
    });

    return card;
  } catch (error) {
    console.error('Erro ao descurtir cartão:', error);
    throw new Error(
      error.statusCode === 404
        ? 'Cartão não encontrado'
        : 'Não foi possível descurtir o cartão',
    );
  }
}

export {
  listCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
