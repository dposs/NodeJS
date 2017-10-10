var app = require("./app");

app.listen(app.get("port"), () => {
  console.info("Server is running on port " + app.get('port'));
});
