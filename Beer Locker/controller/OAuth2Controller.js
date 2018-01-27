var oauth2orize = require("oauth2orize")
var User = require("../model/User");
var Client = require("../model/Client");
var AccessToken = require("../model/AccessToken");
var AuthorizationCode = require("../model/AuthorizationCode");

class OAuth2Controller {

  initialize() {
    this.server = oauth2orize.createServer();

    // Client Serialization

    this.server.serializeClient((client, done) => {
      return done(null, client._id);
    });

    // Client Deserialization

    this.server.deserializeClient((id, done) => {
      Client.findOne({ _id: id }, (error, client) => {
        if (error) { return done(error); }
        return done(null, client);
      });
    });

    // Grant a new Authorization Code for Client and User

    this.server.grant(oauth2orize.grant.code((client, redirectURI, user, ares, done) => {
      var authorizationCode = new AuthorizationCode({
        value: this.uid(16),
        clientId: client._id,
        redirectURI: redirectURI,
        userId: user._id
      });
    
      authorizationCode.save((error) => {
        if (error) { return done(error); }
        done(null, authorizationCode.value);
      });
    }));

    // Exchange the Authorization Code for an Access Token

    this.server.exchange(oauth2orize.exchange.code((client, code, redirectURI, done) => {
      AuthorizationCode.findOne({ value: code }, (error, authorizationCode) => {
        if (error) return done(error);
        if (!authorizationCode) return done(null, false);
        if (client._id.toString() !== authorizationCode.clientId) return done(null, false);
    
        authorizationCode.remove((error) => {
          if (error) return done(error);
    
          var accessToken = new AccessToken({
            value: this.uid(256),
            clientId: authorizationCode.clientId,
            userId: authorizationCode.userId
          });
    
          accessToken.save((error) => {
            if (error) return done(error);
            done(null, accessToken);
          });
        });
      });
    }));
  }

  get authorization() {
    return [
      this.server.authorization((clientId, redirectURI, done) => {
        Client.findOne({ id: clientId }, (error, client) => {
          if (error) { return done(error); }
          return done(null, client, redirectURI);
        });
      }),
      function(request, response) {
        response.render("dialog", { 
          transactionID: request.oauth2.transactionID,
          user: request.user,
          client: request.oauth2.client
        });
      }
    ];
  }

  get decision() {
    return [
      this.server.decision()
    ];
  }

  get token() {
    return [
      this.server.token(),
      this.server.errorHandler()
    ];
  }

  uid(len) {
    var buf = []
      , chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
      , charlen = chars.length;
  
    for (let i = 0; i < len; ++i) {
      buf.push(chars[this.getRandomInt(0, charlen - 1)]);
    }
  
    return buf.join("");
  };
  
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

module.exports = OAuth2Controller;