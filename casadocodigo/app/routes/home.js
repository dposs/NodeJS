module.exports = function(app) {

  let connectionFactory = new app.infra.ConnectionFactory();
  let produtoDAO = new app.dao.ProdutoDAO(connectionFactory);

  app.get("/", function(request, response) {
    produtoDAO.getAll(function(erros, resultados) {
      response.render("home/index", {livros: resultados});
    });
  });  
}