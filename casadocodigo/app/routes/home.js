module.exports = function(app) {

  var connectionFactory = new app.infra.ConnectionFactory();
  var produtoDAO = new app.dao.ProdutoDAO(connectionFactory);

  app.get("/", function(request, response) {
    produtoDAO.getAll(function(erros, resultados) {
      response.render("home/index", {livros: resultados});
    });
  });  
}