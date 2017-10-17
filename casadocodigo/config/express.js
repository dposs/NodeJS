var express = require("express");
var consign = require("consign");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");

module.exports = () => {
  var app = express();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(expressValidator());

  consign({cwd: "app"})
    .include("infra")
    .then("dao")
    .then("routes")
    .into(app);

  app.set("view engine", "ejs");
  app.set("views", "./app/views");

  return app;
}
