var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var config = require("./infra/config");

var DataSource = require("./infra/DataSource");
var Logger = require("./infra/Logger");

const app = express();

app.use(bodyParser.json());
app.set("port", 7000);

DataSource.initialize(config.database);
Logger.initialize(config.log);

var normalizedPath = path.join(__dirname, "routes");

require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./routes/" + file)(app);
});

module.exports = app;
