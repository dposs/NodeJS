module.exports = function(app) {

  let connectionFactory = new app.infra.ConnectionFactory();
  let produtoDAO = new app.dao.ProdutoDAO(connectionFactory);

  app.get("/promocoes/form", (request, response) => {
    produtoDAO.getAll((error, produtos) => {
      response.render("promocoes/form", {lista: produtos});
    });
  });

  app.post("/promocoes", (request, response) => {
    var promocao = request.body;
    app.get("io").emit("novaPromocao", promocao);
    response.redirect("promocoes/form");
  });
}