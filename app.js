require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const authRouter = require('./routes/auth.route');
const itemRouter = require('./routes/item.route');
const buyRouter = require('./routes/buy.route');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(cors({origin: process.env.APP_URI, credentials: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/auth', authRouter);
app.use('/item', itemRouter);
app.use('/buy', buyRouter);

app.use(errorMiddleware);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((err) => console.error('Erreur de connexion à MongoDB :', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Le serveur tourne !`);
});

module.exports = app;