var express = require("express");
var consign = require("consign");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");

module.exports = () => {
  var app = express();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(expressValidator());
  app.use(express.static("./app/public"));

  consign({cwd: "app"})
    .include("infra")
    .then("dao")
    .then("routes")
    .into(app);

  app.use(function(request, response, next) {
    response.status(404).render("erros/404");
    next();
  });

  app.use(function(error, request, response, next) {
    if (process.env.NODE_ENV == "production") {
      response.status(500).render("erros/500");
      return;
    }
    next(error);
  });

  app.set("view engine", "ejs");
  app.set("views", "./app/views");

  return app;
}
