let express = require("express");
let mongoose = require("mongoose");
let bodyParser = require("body-parser");
let passport = require("passport");

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost:27017/beerlocker", {useMongoClient: true});

let AuthController = require("./controller/AuthController");
let BeerController = require("./controller/BeerController");
let UserController = require("./controller/UserController");
let ClientController = require("./controller/ClientController");

let app = express();
let port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(passport.initialize());

let authController = new AuthController();
let beerController = new BeerController();
let userController = new UserController();
let clientController = new ClientController();

authController.initializeAuthentication();

// Routes

let router = express.Router();

router.use(authController.isAuthenticated());

router.get("/", function(request, response) {
  response.json({ message: "You are running dangerously low on beer!" });
});

router.route("/beers")
  .post(beerController.postBeers)
  .get(beerController.getBeers);

router.route("/beers/:beer_id")
  .get(beerController.getBeer)
  .put(beerController.putBeer)
  .delete(beerController.deleteBeer);

router.route('/users')
  .post(userController.postUsers)
  .get(userController.getUsers);

router.route("/users/:user_id")
  .get(userController.getUser)
  .put(userController.putUser)
  .delete(userController.deleteUser);

router.route('/clients')
  .post(clientController.postClients)
  .get(clientController.getClients);

router.route("/clients/:client_id")
  .get(clientController.getClient)
  .put(clientController.putClient)
  .delete(clientController.deleteClient);

app.use("/api", router);

// Start the server

app.listen(port);

console.log("Insert beer on port " + port);