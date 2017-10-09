var passport = require("passport");
var {Strategy, ExtractJwt} = require("passport-jwt");

module.exports = app => {
  const Users = app.datasource.models.Users;

  const opts = {
    secretOrKey: app.config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
  };

  const strategy = new Strategy(opts, (payload, done) => {
    Users.findById(payload.id)
      .then(user => {
        if (user) {
          return done(null, {
            id: user.id,
            email: user.email
          });
        }
        return done(null, false);
      })
      .catch(error => done(error, false));
  });

  passport.use(strategy);

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate("jwt", app.config.jwtSession)
  }
}
