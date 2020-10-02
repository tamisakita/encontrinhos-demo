
const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/signup', (req, res) => {
  res.render('auth-views/signup');
});

const verifyData = 
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, confirmationPassword } = req.body;

    // const newUser = new User({
    //   name,
    //   email,
    //   password,
    // });

    // await newUser.save();

    // res.redirect('/login');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

