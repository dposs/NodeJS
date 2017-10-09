var HttpStatus = require("http-status");
var jwt = require("jwt-simple");

module.exports = app => {
  const Users = app.datasource.models.Users;

  app.route("/token")
    .post((req, res) => {
      if (req.body.email && req.body.password) {
        const email = req.body.email;
        const password = req.body.password;

        Users.findOne({where: {email}})
          .then(user => {
            if (user.isPassword(password)) {
              const payload = {id: user.id};
              res.json({
                token: jwt.encode(payload, app.config.jwtSecret)
              });
            } else {
              res.sendStatus(HttpStatus.UNAUTHORIZED);
            }
          })
          .catch((error) => {
            res.sendStatus(HttpStatus.UNAUTHORIZED)
          });

      } else {
        res.sendStatus(HttpStatus.UNAUTHORIZED);
      }
    });
};
