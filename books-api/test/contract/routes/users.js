var jwt = require("jwt-simple");

describe("Routes Users", () => {

  const Users = app.datasource.models.Users;

  const jwtSecret = app.config.jwtSecret;

  const defaultUser = {
    id: 1,
    name: "Default User",
    email: "default.user@email.com",
    password: "123456"
  };

  const updatedUser = {
    id: 1,
    name: "Updated User",
    email: "udpated.user@email.com",
    password: "654321"
  };

  const newUser = {
    id: 2,
    name: "New User",
    email: "new.user@email.com",
    password: "654321"
  };

  const userSchema = Joi.object().keys({
    id: Joi.number(),
    name: Joi.string(),
    email: Joi.string(),
    password: Joi.string(),
    created_at: Joi.date().iso(),
    updated_at: Joi.date().iso()
  });

  const usersSchema = Joi.array().items(userSchema);

  const countSchema = Joi.array().items(1);

  var token;

  before(done => {
    Users
      .destroy({where: {}})
      .then(() =>
        Users.create({
          id: 9,
          name: "Tester User",
          email: "tester@mail.com",
          password: "123456"
        })
        .then(user => {
          token = jwt.encode({id: user.id}, jwtSecret);
          done();
        })
      );
  });

  beforeEach(done => {
    Users.destroy({where: {name: {$ne: "Tester User"}}})
      .then(() => {Users.create(defaultUser)})
      .then(() => {
        done();
      });
  });

  describe("Route GET /users", () => {
    it("should return a list of users", done => {
      request.get("/users")
        .set("Authorization", "JWT " + token)
        .end((err, res) => {
          joiAssert(res.body, usersSchema);
          done(err);
        });
    });
  });

  describe("Route POST /users", () => {
    it("should create a user", done => {
      request.post("/users")
        .set("Authorization", "JWT " + token)
        .send(newUser)
        .end((err, res) => {
          joiAssert(res.body, userSchema);
          done(err);
        });
    });
  });

  describe("Route GET /users/{id}", () => {
    it("should return a user", done => {
      request.get("/users/1")
        .set("Authorization", "JWT " + token)
        .end((err, res) => {
          joiAssert(res.body, userSchema);
          done(err);
        });
    });
  });

  describe("Route PUT /users/{id}", () => {
    it("should update a user", done => {
      request.put("/users/1")
        .set("Authorization", "JWT " + token)
        .send(updatedUser)
        .end((err, res) => {
          joiAssert(res.body, countSchema);
          done(err);
        });
    });
  });

  describe("Route DELETE /users/{id}", () => {
    it("should delete a user", done => {
      request.delete("/users/1")
        .set("Authorization", "JWT " + token)
        .end((err, res) => {
          joiAssert(res.statusCode, Joi.number());
          done(err);
        });
    });
  });

});
