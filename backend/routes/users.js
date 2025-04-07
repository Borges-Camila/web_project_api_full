import { Router } from 'express';
import {
  listUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
} from '../controllers/users.js';

const router = Router();

// procura os usuários

router.get('/', async (request, response) => {
  try {
    const users = await listUsers();
    return response.json(users);
  } catch (error) {
    console.log(error);
    return response.status(404).json({
      error: 'ERROR: Não foi possivel encontrar os usuários',
    });
  }
});

// procura usuário pelo id

router.get('/:_id', async (request, response) => {
  try {
    const { _id } = request.params;
    const foundUser = await getUserById(_id);

    if (!foundUser) {
      return response
        .status(404)
        .json({ message: `${_id} do usuário não encontrado` });
    }

    return response.json(foundUser);
  } catch (error) {
    console.log(error);
    return response.status(404).json({
      error:
        'ERROR: Não foi possivel encontrar o usuário especificado',
    });
  }
});

// criação de novo usuário

router.post('/', async (request, response) => {
  try {
    const { name, about, avatar } = request.body;
    const createdUser = await createUser({ name, about, avatar });
    return response.status(201).json(createdUser);
  } catch (error) {
    console.log(error);
    return response.status(400).json({
      error: 'ERROR: Não foi possivel criar novo usuário',
    });
  }
});

// atualização de usuário (name, about)

router.patch('/me', async (request, response) => {
  try {
    const { _id, name, about } = request.body;
    if (!_id) {
      return response
        .status(400)
        .json({ error: 'ID do usuário não fornecido' });
    }
    const updatedUserInfo = await updateUserInfo(_id, {
      name,
      about,
    });
    return response.status(200).json(updatedUserInfo);
  } catch (error) {
    return response.status(400).json({
      error: 'ERROR: Não foi possivel atualizar o usuário',
    });
  }
});

// atualização de usuário (avatar)

router.patch('/me/avatar', async (request, response) => {
  try {
    const { _id, avatar } = request.body;
    if (!_id) {
      return response
        .status(400)
        .json({ error: 'ID do usuário não fornecido' });
    }
    const updatedUserAvatar = await updateUserAvatar(_id, {
      avatar,
    });
    return response.status(200).json(updatedUserAvatar);
  } catch (error) {
    return response.status(400).json({
      error: 'ERROR: Não foi possivel atualizar o usuário',
    });
  }
});

export default router;
