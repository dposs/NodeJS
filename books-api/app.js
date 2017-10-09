var express = require("express");
var bodyParser = require("body-parser")
var config = require("./config/config");
var datasource = require("./config/datasource");
var authorization = require("./auth");

var booksRouter = require("./routes/books");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");

const app = express();

app.config = config;
app.datasource = datasource(app);
app.auth = authorization(app);

app.use(bodyParser.json());
app.use(app.auth.initialize());

app.set("port", 7000);

booksRouter(app);
usersRouter(app);
authRouter(app);

module.exports = app;
