var UsersController = require("../../../controllers/users")

const expectedResponse = {
  id: 1,
  name: "Test User",
  email: "test.user@mail.com",
  password: "123456",
  created_at: "2016-08-06T23:55:36.692Z",
  updated_at: "2016-08-06T23:55:36.692Z"
};

describe("Controllers: Users", () => {

  describe("Get all users: getAll()", () => {
    it("should return a list of users", () => {
      const Users = {
        findAll: td.function()
      };

      td.when(Users.findAll({})).thenResolve(expectedResponse);

      const usersController = new UsersController(Users);
      return usersController.getAll()
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe("Get user by id: getById()", () => {
    it("should return a user", () => {
      const Users = {
        findOne: td.function()
      };

      td.when(Users.findOne({where: {id: 1}})).thenResolve(expectedResponse);

      const usersController = new UsersController(Users);
      return usersController.getById({id: 1})
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe("Create a user: create()", () => {
    it("should create a user", () => {
      const Users = {
        create: td.function()
      };

      const requestBody = {
        name: "Test User",
        description: "Description of Test User"
      }

      td.when(Users.create(requestBody)).thenResolve(expectedResponse);

      const usersController = new UsersController(Users);
      return usersController.create(requestBody)
        .then(response => {
          expect(response.statusCode).to.be.eql(201);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe("Update a user: update()", () => {
    it("should update a user", () => {
      const Users = {
        update: td.function()
      };

      const requestBody = {
        id: 1,
        name: "Test User",
        description: "Description of Test User"
      }

      td.when(Users.update(requestBody, {where: {id: 1}})).thenResolve(expectedResponse);

      const usersController = new UsersController(Users);
      return usersController.update(requestBody, {id: 1})
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe("Delete a user: delete()", () => {
    it("should delete a user", () => {
      const Users = {
        destroy: td.function()
      };

      td.when(Users.destroy({where: {id: 1}})).thenResolve({});

      const usersController = new UsersController(Users);
      return usersController.delete({id: 1})
        .then(response => expect(response.statusCode).to.be.eql(204));
    });
  });

});
