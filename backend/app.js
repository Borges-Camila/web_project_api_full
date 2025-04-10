import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/users.js';
import cardRouter from './routes/cards.js';
import { login, createUser } from './controllers/users.js';

// No app.js, crie dois manipuladores POST para duas rotas, '/signin' e '/signup'

// app.post('/signin', login);
// app.post('/signup', createUser);

async function connectDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/aroundb', {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('Database connect');
  } catch (error) {
    console.log('Error: Não foi possível conectar ao database');
  }
}

const app = express();
app.use(express.json());

// Middleware de Autorização

app.use((req, res, next) => {
  req.user = {
    _id: '67d384943e818db3576451b0',
  };

  next();
});

const port = 3000;

connectDatabase();

function logger(req, res, next) {
  console.log(
    `${new Intl.DateTimeFormat('pt-BR').format(Date.now())} - ${
      req.method
    } - ${req.url}`,
  );
  next();
}

app.use(logger);

app.use('/users', userRouter);

app.use('/cards', cardRouter);

app.post('/signin', async (request, response) => {
  try {
    const { email, password } = request.body;
    const loggedUser = await login({
      email,
      password,
    });
    return response.status(200).json(loggedUser);
  } catch (error) {
    const { message, statusCode, type } = error;
    if (!error.statusCode) {
      error.statusCode = 400;
      error.type = 'Validação interna';
    }
    return response.status(statusCode).json({
      type,
      message,
    });
  }
});

app.post('/signup', async (request, response) => {
  try {
    const { email, password, name, about, avatar } = request.body;
    const createdUser = await createUser({
      email,
      password,
      name,
      about,
      avatar,
    });
    return response.status(201).json(createdUser);
  } catch (error) {
    const { message, statusCode, type } = error;
    if (!error.statusCode) {
      error.statusCode = 400;
      error.type = 'Validação interna';
    }
    if (error.message.includes('email')) {
      error.message = 'Email já cadastrado';
    }
    return response.status(statusCode).json({
      type,
      message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.use((req, res) => {
  res
    .status(404)
    .json({ message: 'A solicitação não foi encontrada' });
});
