let passport = require("passport");
let BasicStrategy = require("passport-http").BasicStrategy;
let BearerStrategy = require("passport-http-bearer").Strategy

let AccessToken = require("../model/AccessToken");
let User = require("../model/User");
let Client = require("../model/Client");

class AuthController {

  initialize() {
    passport.use(new BasicStrategy(
      function(username, password, done) {
        User.findOne({ username: username }, function (error, user) {
          if (error) return done(error);
          if (!user) return done(null, false);
    
          user.verifyPassword(password, function(error, isMatch) {
            if (error) return done(error);
            if (!isMatch) return done(null, false);
    
            return done(null, user);
          });
        });
      }
    ));

    passport.use("client-basic", new BasicStrategy(
      function(username, password, done) {
        Client.findOne({ id: username }, function (error, client) {
          if (error) return done(error);
          if (!client || client.secret !== password) return done(null, false);
    
          return done(null, client);
        });
      }
    ));

    passport.use("bearer", new BearerStrategy(
      function(accessToken, done) {
        AccessToken.findOne({ value: accessToken }, function (error, token) {
          if (error) return done(error);
          if (!token) return done(null, false);
    
          User.findOne({ _id: token.userId }, function (error, user) {
            if (error) return done(error);
            if (!user) return done(null, false);
    
            done(null, user, { scope: "*" });
          });
        });
      }
    ));
  }

  isUserAuthenticated() {
    return passport.authenticate(["basic", "bearer"], { session : false });
  }

  isClientAuthenticated() {
    return passport.authenticate("client-basic", { session : false });
  }
}

module.exports = AuthController;