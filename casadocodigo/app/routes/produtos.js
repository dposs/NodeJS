module.exports = (app) => {

  var connectionFactory = new app.infra.ConnectionFactory();
  var produtoDAO = new app.dao.ProdutoDAO(connectionFactory);

  app.route("/produtos")
    .get((request, response) => {

      produtoDAO.getAll((error, result) => {

        if (error) {
          console.error(error);
          response.send(error.message);
        }

        response.format({
            html: () => {
                response.render('produtos/lista', {lista: result});
            },
            json: () => {
                response.json(result)
            }
        });
      })
    })
    .post((request, response) => {
      var produto = request.body;

      console.log("produto", produto);

      var validatorTitulo = request.assert('titulo','Titulo é obrigatório');
      validatorTitulo.notEmpty();

      var erros = request.validationErrors();

      if (erros) {
        response.redirect("/produtos/form");
        return;
      }

      produtoDAO.insert(produto, (error, result) => {
        response.redirect("/produtos");
      });
    });

  app.get("/produtos/form", (request, response) => {
    response.render("produtos/form");
  });

  app.delete("/produtos/:id", (request, response) => {
    produtoDAO.delete(request.params, (error, result) => {
      response.redirect("/produtos");
    });
  })
}
