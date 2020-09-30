require('dotenv').config();

const express = require('express');

const app = express();

app.get('/', (request, response, next ) => response.sendFile(__dirname + '/views/home.html'));

app.listen(process.env.PORT, () => console.log(`My first app listening on port ${process.env.PORT}!`));

module.exports = app;
