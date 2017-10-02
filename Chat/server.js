var net = require("net");

var connections = [];

var broadcast = function(message, origin) {
  connections.forEach(function(connection) {
    if (connection === origin) {
      return;
    }
    connection.write(message);
  });
};

var server = net.createServer(function(connection) {
  connections.push(connection);

  connection.write("Hello. I'm the server!");

  connection.on("data", function(message) {
    var command = message.toString();

    if (command.indexOf("/nickname ") === 0) {
      var nickname = command.replace("/nickname ", "");
      connection.nickname = nickname;
      return;
    }

    broadcast(connection.nickname + " > " + message, connection);
  });

  connection.on("end", function() {
    broadcast(connection.nickname + " has left!", connection);
    connections.splice(connections.indexOf(connection), 1);
  })
});

server.listen(3000);
