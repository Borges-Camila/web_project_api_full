import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/users.js';
import cardRouter from './routes/cards.js';

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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.use((req, res) => {
  res
    .status(404)
    .json({ message: 'A solicitação não foi encontrada' });
});
