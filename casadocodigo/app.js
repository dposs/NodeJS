var express = require("./config/express");
var http = require("http");
var socketio = require("socket.io");

let app = express();
let server = http.Server(app);
let io = socketio(server);

app.set("io", io);

server.listen(3000, function() {
	console.log("servidor rodando");
});