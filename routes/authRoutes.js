const express = require('express');
const User = require('../models/User');
const passwordManager = require('../utils/passwordManager');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.render('auth-views/signup');
});

//falta validação de email 
const verifyData = async (req, res) => {
  const { name, email, password, confirmationPassword } = req.body;

  if (!name || !email || !password || !confirmationPassword) {
    const errors = {
      nameError: !name ? 'Campo nome de usuário obrigatório' : undefined,
      emailError: !email ? 'Campo email obrigatório' : undefined,
      passwordError: !password ? 'Campo senha obrigatório' : undefined,
      confirmationPasswordError: !confirmationPassword ? 'Campo confirmação de senha obrigatório' : undefined,
    };

    res.render('auth-views/signup', errors);

    return false;
  }

  if (password.length < 6) {
    const errors = {
      passwordError: password.length < 6 ? 'Sua senha deve ter no mínimo 6 dígitos' : undefined,
    };

    res.render('auth-views/signup', errors);

    return false;
  }

  if (!(password === confirmationPassword)) {
    const errors = {
      passwordError: 'Senhas não conferem',
      confirmationPasswordError: 'Senhas não conferem',
    };

    res.render('auth-views/signup', errors);

    return false;
  }

  const userEmailExists = await User.find({ email });

  if (userEmailExists.length > 0) {
    const errors = {
      emailError: userEmailExists.length > 0 ? 'Email já cadastrado' : undefined,
    };

    res.render('auth-views/signup', errors);

    return false;
  }
  return true;
};

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const idDataValid = await verifyData(req, res);

    if (!idDataValid) {
      return;
    }

    const newUser = new User({
      name,
      email,
      password: await passwordManager.generateEncryptedPassword(password),
    });

    await newUser.save();

    res.redirect('/login');
  } catch (error) {
    console.log(error);
  }
});

router.get('/login', (req, res) => res.render('auth-views/login'));

router.post('/login', async (req, res, next) => {
  try {
    const { name, password } = req.body;

    const existingUser = await User.findOne({ name });

    if (!existingUser || !passwordManager.verifyPassword(password, existingUser.password)) {
      res.render('auth-views/login', { errorMessage: 'Nome de usuário ou senha incorretos.' });

      return;
    }

    req.session.currentUser = existingUser;

    res.redirect('/home');
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
