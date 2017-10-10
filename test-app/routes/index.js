var fs = require("fs");
var path = require("path");

module.exports = (app) => {

  const dir = path.join(__dirname, "../routes");

  fs.readdirSync(dir).forEach(file => {
    if (file != "index.js") {
      var route = require("./" + file);
      route(app);
    }
  });

  app.route("/admin")
    .get((req, res) => {
      res.send("Hello Admin!");
    });

  app.route("/site")
    .get((req, res) => {
      res.send("Hello World! You are in the site.");
    });

  app.route("/web")
    .get((req, res) => {
      res.send("Hello Admin! You are in the web.");
  });
};
