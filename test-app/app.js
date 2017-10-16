var express = require("express");
var bodyParser = require("body-parser");
var consign = require('consign');

const app = express();

app.use(bodyParser.json());

consign()
  .include("infra")
  .then("model")
  .then("dao")
  .then("service")
  .then("controller")
  .then("route")
  .into(app);

app.set("port", 7000);

module.exports = app;
