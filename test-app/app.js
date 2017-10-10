var express = require("express");
var bodyParser = require("body-parser");

var datasource = require("./config/datasource");
var config = require("./config/config");
var routes = require("./routes");

const app = express();

app.config = config;
app.datasource = datasource(app);

app.use(bodyParser.json());

app.set("port", 7000);

routes(app);

module.exports = app;
