var jwt = require("jwt-simple");

describe("Routes Books", () => {

  const Books = app.datasource.models.Books;
  const Users = app.datasource.models.Users;

  const jwtSecret = app.config.jwtSecret;

  const defaultBook = {
    id: 1,
    name: "Default Book",
    description: "Description of Default Book"
  };

  const updatedBook = {
    id: 1,
    name: "Updated Book",
    description: "Description of Updated Book"
  };

  const newBook = {
    id: 2,
    name: "New Book",
    description: "Description of New Book"
  };

  const bookSchema = Joi.object().keys({
    id: Joi.number(),
    name: Joi.string(),
    description: Joi.string(),
    created_at: Joi.date().iso(),
    updated_at: Joi.date().iso()
  });

  const booksSchema = Joi.array().items(bookSchema);

  const countSchema = Joi.array().items(1);

  var token;

  before(done => {
    Users
      .destroy({where: {}})
      .then(() =>
        Users.create({
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
    Books.destroy({where: {}})
      .then(() => {Books.create(defaultBook)})
      .then(() => {
        done();
      });
  });

  describe("Route GET /books", () => {
    it("should return a list of books", done => {
      request.get("/books")
        .set("Authorization", "JWT " + token)
        .end((err, res) => {
          joiAssert(res.body, booksSchema);
          done(err);
        });
    });
  });

  describe("Route POST /books", () => {
    it("should create a book", done => {
      request.post("/books")
        .set("Authorization", "JWT " + token)
        .send(newBook)
        .end((err, res) => {
          joiAssert(res.body, bookSchema);
          done(err);
        });
    });
  });

  describe("Route GET /books/{id}", () => {
    it("should return a book", done => {
      request.get("/books/1")
        .set("Authorization", "JWT " + token)
        .end((err, res) => {
          joiAssert(res.body, bookSchema);
          done(err);
        });
    });
  });

  describe("Route PUT /books/{id}", () => {
    it("should update a book", done => {
      request.put("/books/1")
        .set("Authorization", "JWT " + token)
        .send(updatedBook)
        .end((err, res) => {
          joiAssert(res.body, countSchema);
          done(err);
        });
    });
  });

  describe("Route DELETE /books/{id}", () => {
    it("should delete a book", done => {
      request.delete("/books/1")
        .set("Authorization", "JWT " + token)
        .end((err, res) => {
          joiAssert(res.statusCode, Joi.number());
          done(err);
        });
    });
  });

});
