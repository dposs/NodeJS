let passport = require("passport");
let BasicStrategy = require("passport-http").BasicStrategy;

let User = require("../model/User");

class AuthController {

  initializeAuthentication() {
    AuthController.instance = new AuthController();

    passport.use(new BasicStrategy(
      function(username, password, done) {
        User.findOne({ username: username }, function (error, user) {
          if (error) { return done(error); }
          if (!user) { return done(null, false); }
    
          user.verifyPassword(password, function(error, isMatch) {
            if (error) { return done(error); }
            if (!isMatch) { return done(null, false); }
    
            return done(null, user);
          });
        });
      }
    ));
  }

  isAuthenticated() {
    return passport.authenticate("basic", { session : false });
  }
}

module.exports = AuthController;