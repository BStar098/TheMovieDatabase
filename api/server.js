// Configuración del server
const db = require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const routes = require("./routes");
app.use(cookieParser());
app.use("/user", routes);

db.sync({ force: false }).then(() => {
  app.listen(1336, (req, res, next) => {
    console.log("API ON PORT 1336");
  });
});
