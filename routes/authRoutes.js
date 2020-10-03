
const express = require('express');
const User = require('../models/User');
const generateEncryptedPassword = require('../utils/passwordManager');

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
<<<<<<< HEAD

    if (!idDataValid) {
      return;
    }

    const newUser = new User({
      name,
      email,
      password: await generateEncryptedPassword(password),
    });

    console.log(newUser);
    await newUser.save();

=======

    if (!idDataValid) {
      return;
    }

    const newUser = new User({
      name,
      email,
      password: await generateEncryptedPassword(password),
    });

    console.log(newUser);
    await newUser.save();

>>>>>>> 6258b169c187ace3974e39ddd7d4128ec39fbb0e
    res.redirect('/login');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

