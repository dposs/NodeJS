var HttpStatus = require("http-status");
var jwt = require("jwt-simple");

describe("Routes Users", () => {

  const Users = app.datasource.models.Users;

  const jwtSecret = app.config.jwtSecret;

  const defaultUser = {
    id: 1,
    name: "Default User",
    email: "default.user@mail.com",
    password: "123456"
  };

  const updatedUser = {
    id: 1,
    name: "Updated User",
    email: "updated.user@mail.com",
    password: "654321"
  };

  const newUser = {
    id: 2,
    name: "New User",
    email: "new.user@mail.com",
    password: "654321"
  };

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
          expect(res.body[0].id).to.be.eql(defaultUser.id);
          expect(res.body[0].name).to.be.eql(defaultUser.name);
          expect(res.body[0].email).to.be.eql(defaultUser.email);
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
          expect(res.body.id).to.be.eql(newUser.id);
          expect(res.body.name).to.be.eql(newUser.name);
          expect(res.body.email).to.be.eql(newUser.email);
          done(err);
        });
    });
  });

  describe("Route GET /users/{id}", () => {
    it("should return a user", done => {
      request.get("/users/1")
        .set("Authorization", "JWT " + token)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultUser.id);
          expect(res.body.name).to.be.eql(defaultUser.name);
          expect(res.body.email).to.be.eql(defaultUser.email);
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
          expect(res.body).to.be.eql([1]);
          done(err);
        });
    });
  });

  describe("Route DELETE /users/{id}", () => {
    it("should delete a user", done => {
      request.delete("/users/1")
        .set("Authorization", "JWT " + token)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(HttpStatus.NO_CONTENT);
          done(err);
        });
    });
  });

});
