// const url = require('url');
// const querystring = require('querystring');

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

      request.assert('titulo','Titulo é obrigatório').notEmpty();
      request.assert('preco','Formato inválido').isFloat();

      var erros = request.validationErrors();

      if (erros) {
        response.format({
          html: () => {
            response.status(400).render("produtos/form", {
              errosValidacao: erros,
              produto: produto
            });
          },
          json: () => {
            response.status(400).json(erros);
          }
        });
        return;
      }

      produtoDAO.insert(produto, (error, result) => {
        response.redirect("/produtos");
      });
    });

  app.get("/produtos/form", (request, response) => {
    response.render("produtos/form", {
      errosValidacao: {},
      produto: {}
    });
  });

  app.delete("/produtos/:id", (request, response) => {
    produtoDAO.delete(request.params, (error, result) => {
      response.redirect("/produtos");
    });
  })
}
