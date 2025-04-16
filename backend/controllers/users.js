import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';
import CustomError from '../utils/CustomError.js';

// função para o hash
function createHash(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

// controladores

// atualizar o erro

async function getUser(id) {
  try {
    const user = await UserModel.findById(id);
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
    const {
      email,
      password,
      name = 'Novo usuário',
      about = 'sobre o usuário',
      avatar = 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg',
    } = items;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new CustomError(
        'Email já cadastrado',
        500,
        'Conflito',
      );
    }
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
    throw new CustomError(
      'Não foi possível criar o usuário',
      400,
      'Erro de validação',
    );
  }
}

async function updateUserInfo(id, body = {}) {
  try {
    if (!body || typeof body !== 'object') {
      throw new CustomError(
        'Dados inválidos para atualização',
        400,
        'Requisição',
      );
    }

    const foundUser = await UserModel.findById(id);
    if (!foundUser) {
      throw new CustomError(
        'Não foi possivel encontrar o usuário especificado',
        400,
        'MongoDB - get by id',
      );
    }

    const { name, about } = body;

    const updatedUser = UserModel.findByIdAndUpdate(
      id,
      { name, about },
      {
        new: true,
        runValidators: true,
        upsert: true,
      },
    );
    if (!updatedUser) {
      throw new CustomError(
        'Usuário não atualizado',
        404,
        'Recurso',
      );
    }
    return updatedUser;
  } catch (error) {
    throw new CustomError(
      'Erro ao atualizar informações do usuário',
      500,
      'MongoDB',
    );
  }
}

async function updateUserAvatar(id, body = {}) {
  try {
    if (!body || typeof body !== 'object') {
      throw new CustomError(
        'Dados inválidos para atualização do avatar',
        400,
        'Requisição',
      );
    }

    const foundUser = await UserModel.findById(id);
    if (!foundUser) {
      throw new CustomError(
        'Não foi possivel encontrar o usuário especificado',
        400,
        'MongoDB - get by id',
      );
    }

    const { avatar } = body;

    const updatedAvatar = UserModel.findByIdAndUpdate(
      id,
      { avatar },
      {
        new: true,
        runValidators: true,
        upsert: true,
      },
    );
    if (!updatedAvatar) {
      throw new CustomError(
        'Usuário não encontrado para atualizar avatar',
        404,
        'Recurso',
      );
    }
    return updatedAvatar;
  } catch (error) {
    throw new CustomError(
      'Erro ao atualizar avatar do usuário',
      500,
      'MongoDB',
    );
  }
}

async function login(items) {
  try {
    const { email, password } = items;
    const foundUser = await UserModel.findUserByCredentials({
      email,
      password,
    });
    if (foundUser.error) {
      throw new CustomError(
        'Email ou senha incorretos',
        401,
        'Autenticação',
      );
    }
    const token = jwt.sign(
      { id: String(foundUser.id) },
      'jwt-secreto',
      {
        expiresIn: '7d',
      },
    );
    return { id: foundUser.id, token };
  } catch (error) {
    throw new CustomError(
      'Erro ao realizar login',
      500,
      'Autenticação',
    );
  }
}

export {
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
};
