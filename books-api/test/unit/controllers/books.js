var BooksController = require("../../../controllers/books")

const expectedResponse = {
  id: 1,
  name: "Test Book",
  description: "Description of Test Book",
  created_at: "2016-08-06T23:55:36.692Z",
  updated_at: "2016-08-06T23:55:36.692Z"
};

describe("Controllers: Books", () => {

  describe("Get all books: getAll()", () => {
    it("should return a list of books", () => {
      const Books = {
        findAll: td.function()
      };

      td.when(Books.findAll({})).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);
      return booksController.getAll()
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe("Get book by id: getById()", () => {
    it("should return a book", () => {
      const Books = {
        findOne: td.function()
      };

      td.when(Books.findOne({where: {id: 1}})).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);
      return booksController.getById({id: 1})
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe("Create a book: create()", () => {
    it("should create a book", () => {
      const Books = {
        create: td.function()
      };

      const requestBody = {
        name: "Test Book",
        description: "Description of Test Book"
      }

      td.when(Books.create(requestBody)).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);
      return booksController.create(requestBody)
        .then(response => {
          expect(response.statusCode).to.be.eql(201);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe("Update a book: update()", () => {
    it("should update a book", () => {
      const Books = {
        update: td.function()
      };

      const requestBody = {
        id: 1,
        name: "Test Book",
        description: "Description of Test Book"
      }

      td.when(Books.update(requestBody, {where: {id: 1}})).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);
      return booksController.update(requestBody, {id: 1})
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe("Delete a book: delete()", () => {
    it("should delete a book", () => {
      const Books = {
        destroy: td.function()
      };

      td.when(Books.destroy({where: {id: 1}})).thenResolve({});

      const booksController = new BooksController(Books);
      return booksController.delete({id: 1})
        .then(response => expect(response.statusCode).to.be.eql(204));
    });
  });

});
