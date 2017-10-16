var http = require("http");
var porta = 3000;
var ip = "localhost";

var server = http.createServer(function(request, response) {
	
	response.writeHead(200, {'Content-Type': 'text/html'});
	
	if (request.url == "/produtos") {
		response.end("<html><body><h1>Listando os produtos</h1></body></html>");
	} else {
		response.end("<html><body><h1>Home da casa do código</h1></body></html>");
	}
});

server.listen(porta, ip);

console.log("Server running at http://" + ip + ":" + porta + "/");