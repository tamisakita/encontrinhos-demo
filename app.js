require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const hbs = require("hbs");
const path = require("path");
const cors = require("cors");

const appRoutes = require("./routes/appRoutes");
const authRoutes = require("./routes/authRoutes");
const apiRoutes = require("./routes/apiRoutes");

const app = express();

require("./configs/session.config")(app);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log(`Conectado ao Banco ${process.env.PORT}`))
  .catch((err) => {
    throw new Error(err);
  });

app.use(express.static(__dirname + "/public"));
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

hbs.registerPartials(path.join(__dirname + "/views/partials"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [process.env.URL_BASE, "https://encontrinhos.herokuapp.com"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  }),
);

app.use("/", authRoutes);
app.use("/", appRoutes);
app.use("/api", apiRoutes);

app.listen(process.env.PORT, () =>
  console.log(`My first app listening on port ${process.env.PORT}!`)
);
