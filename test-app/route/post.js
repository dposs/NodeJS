module.exports = (app) => {

  var postController = new app.controller.PostController();

  app.route("/posts")
    .get((req, res) => {
      postController.getAll(req, res);
    })
    .post((req, res) => {
      postController.create(req.body)
        .then(result => {
          res.status(result.statusCode);
          res.json(result.data);
        });
    });

  app.route("/post/:id")
    .get((req, res) => {
      postController.getById(req.params)
        .then(result => {
          res.status(result.statusCode);
          res.json(result.data);
        });
    })
    .put((req, res) => {
      postController.update(req.body, req.params)
        .then(result => {
          res.status(result.statusCode);
          res.json(result.data);
        });
    })
    .delete((req, res) => {
      postController.delete(req.params)
        .then(result => {
          res.sendStatus(result.statusCode);
        });
    });
};
