import bcrypt from 'bcryptjs';
import UserModel from '../models/user.js';
import jwt from 'jsonwebtoken';

// função para o hash
function createHash(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

async function listUsers() {
  try {
    const users = await UserModel.find();
    return users;
  } catch (error) {
    throw new Error(
      'Não foi possivel encontrar os usuários',
    ).mongoError('Mongo - get users');
  }
}

async function getUserById(_id) {
  try {
    const user = await UserModel.findById(_id);
    if (!user) {
      throw new Error(
        'Não foi possivel encontrar o usuário especificado',
      ).mongoError('Mongo - get user by id');
    }
    return user;
  } catch (error) {
    throw new Error(
      'Não foi possivel encontrar o usuário especificado',
    ).mongoError('Mongo - get user by id');
  }
}

async function createUser(items) {
  try {
    const { email, password, name, about, avatar } = items;
    const newUser = new UserModel({
      email,
      password: createHash(password),
      name,
      about,
      avatar,
    });
    const creatUser = await newUser.save();
    return creatUser;
  } catch (error) {
    throw new Error('Não foi possivel criar o usuário').mongoError(
      'Mongo - create user',
    );
  }
}

async function updateUserInfo(_id, body = {}) {
  try {
    if (!body || typeof body !== 'object') {
      throw new Error('O corpo da requisição está inválido.');
    }

    const foundUser = await UserModel.findById(_id);
    if (!foundUser) {
      throw new Error(
        'Não foi possivel encontrar o usuário especificado',
      ).mongoError('Mongo - get user by id');
    }

    const { name, about } = body;

    const updatedUser = UserModel.findByIdAndUpdate(
      _id,
      { name, about },
      {
        new: true,
        runValidators: true,
        upsert: true,
      },
    );
    if (!updatedUser) {
      throw new Error('Erro ao atualizar usuário');
    }
    return updatedUser;
  } catch (error) {
    throw new Error(
      'Não foi possivel atualizar as informações do usuário',
    );
  }
}

async function updateUserAvatar(_id, body = {}) {
  try {
    if (!body || typeof body !== 'object') {
      throw new Error('O corpo da requisição está inválido.');
    }

    const foundUser = await UserModel.findById(_id);
    if (!foundUser) {
      throw new Error(
        'Não foi possivel encontrar o usuário especificado',
      ).mongoError('Mongo - get user by id');
    }

    const { avatar } = body;

    const updatedAvatar = UserModel.findByIdAndUpdate(
      _id,
      { avatar },
      {
        new: true,
        runValidators: true,
        upsert: true,
      },
    );
    if (!updatedAvatar) {
      throw new Error('Erro ao atualizar usuário');
    }
    return updatedAvatar;
  } catch (error) {
    throw new Error(
      'Não foi possivel atualizar as informações do usuário',
    );
  }
}

// criação de um controlador para o login
async function login(items) {
  try {
    const { email, password } = items;
    const foundUser = UserModel.findUserByCredentials({
      email,
      password,
    });
    if (foundUser.error) {
      throw new Error('E-mail ou senha incorretos').status(401);
    }
    const token = jwt.sign({ ...foundUser }, 'jwt-secreto', {
      expiresIn: '7d',
    });
    return { id: foundUser.id, token };
  } catch (error) {
    throw new Error('Não foi possivel logar o usuário');
  }
}

export {
  listUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
};
