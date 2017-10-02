var net = require("net");

var connection = net.connect(3000);

connection.on("connect", function() {
  connection.write("Hello, I'm the client!");
})

connection.on("data", function(message) {
  console.log(message.toString());
});

connection.on("end", function() {
  process.exit();
})

process.stdin.on("readable", function() {
  var message = process.stdin.read();
  if (!message) return;
  message = message.toString().replace(/\n/, "");
  connection.write(message);
})
