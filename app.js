require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const path = require('path');

const appRoutes = require('./routes/appRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

require('./configs/session.config')(app);

mongoose.connect('mongodb://localhost/encontrinhos-database', {useUnifiedTopology:true, useNewUrlParser:true})

  .then(() => console.log('funcionou'))
  .catch( error => {
    console.log(error);
    throw new Error ('databse not working');
  });

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

hbs.registerPartials(path.join(__dirname + '/views/partials'));
app.use(bodyParser.urlencoded({extended:false}));

app.use('/', authRoutes);
app.use('/', appRoutes);

app.listen(process.env.PORT, () => console.log(`My first app listening on port ${process.env.PORT}!`));

