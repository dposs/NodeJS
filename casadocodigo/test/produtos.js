let app = require("../config/express")();
let request = require("supertest")(app);

describe("# ProdutosController", function() {

  let connectionFactory;

  before(() => {
    connectionFactory = new app.infra.ConnectionFactory();
  });

  beforeEach(function(done) {
    let con = connectionFactory.createConnection();
    con.query("delete from livros", function(error, result) {
      con.end();
      if (error) done(error);
      else done();
    });
  });

  it("# Listagem JSON", function(done) {
    request.get("/produtos")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });

  it('# Cadastro de novo produto com dados invalidos', function(done) {
    request.post('/produtos')
      .send({titulo: "", descricao: "novo livro"})
      .expect(400, done);
  });

  it('# Cadastro de novo produto com dados validos', function(done) {
    request.post('/produtos')
      .send({titulo: "titulo", descricao: "novo livro", preco: 20.50})
      .expect(302, done);
  });
});