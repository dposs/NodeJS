let express = require("express");
let session = require("express-session");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let passport = require("passport");
let ejs = require("ejs");

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost:27017/beerlocker", {useMongoClient: true});

let AuthController = require("./controller/AuthController");
let OAuth2Controller = require("./controller/OAuth2Controller");
let BeerController = require("./controller/BeerController");
let UserController = require("./controller/UserController");
let ClientController = require("./controller/ClientController");

let app = express();
let port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/view");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "Super Secret Session Key",
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());

let authController = new AuthController();
let oAuth2Controller = new OAuth2Controller();
let beerController = new BeerController();
let userController = new UserController();
let clientController = new ClientController();

authController.initialize();
oAuth2Controller.initialize();

// Routes

let api = express.Router();

api.get("/", function(request, response) {
  response.json({ message: "You are running dangerously low on beer!" });
});

api.route("/oauth2/authorize")
  .all(authController.isUserAuthenticated())
  .get(oAuth2Controller.authorization)
  .post(oAuth2Controller.decision);

api.route("/oauth2/token")
  .all(authController.isClientAuthenticated())
  .post(oAuth2Controller.token);

api.route("/beers")
  .all(authController.isUserAuthenticated())
  .post(beerController.postBeers)
  .get(beerController.getBeers);

api.route("/beers/:beer_id")
  .all(authController.isUserAuthenticated())
  .get(beerController.getBeer)
  .put(beerController.putBeer)
  .delete(beerController.deleteBeer);

api.route("/users")
  .all(authController.isUserAuthenticated())
  .post(userController.postUsers)
  .get(userController.getUsers);

api.route("/users/:user_id")
  .all(authController.isUserAuthenticated())
  .get(userController.getUser)
  .put(userController.putUser)
  .delete(userController.deleteUser);

api.route("/clients")
  .all(authController.isUserAuthenticated())
  .post(clientController.postClients)
  .get(clientController.getClients);

api.route("/clients/:client_id")
  .all(authController.isUserAuthenticated())
  .get(clientController.getClient)
  .put(clientController.putClient)
  .delete(clientController.deleteClient);

app.use("/api", api);

// Start the server

app.listen(port);

console.log("Insert beer on port " + port);