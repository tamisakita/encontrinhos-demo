const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const activateSession = app => {
  app.use(session({
    secret: 'hdiuhasuadhiudshiaduhadiuhdsaiuhadsdhahdaiushiuhdsaiuadh',
    saveUninitialized: false,
    resave: true,
    rolling: true,
    cookie: { maxAge: 120000 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60 * 24,
    }),
  }));
};

module.exports = activateSession;
