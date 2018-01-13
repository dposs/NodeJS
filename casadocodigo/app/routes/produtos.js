// const url = require('url');
// const querystring = require('querystring');

module.exports = (app) => {

  var connectionFactory = new app.infra.ConnectionFactory();
  var produtoDAO = new app.dao.ProdutoDAO(connectionFactory);

  app.route("/produtos")
    .get((request, response, next) => {
      produtoDAO.getAll((error, result) => {
        
        if (error) {
          return next(error);
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
    .post((request, response, next) => {
      var produto = request.body;

      request.assert('titulo', 'Titulo é obrigatório').notEmpty();
      request.assert('preco', 'Formato inválido').isFloat();

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
        if (error) {
          return next(error);
        }
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
