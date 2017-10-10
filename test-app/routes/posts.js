var PostsController = require("../controllers/posts");

module.exports = (app) => {

  var postsController = new PostsController(app);

  app.route("/posts")
    .get((req, res) => {
      postsController.getAll()
        .then(result => {
          res.status(result.statusCode);
          res.json(result.data);
        });
    })
    .post((req, res) => {
      postsController.create(req.body)
        .then(result => {
          res.status(result.statusCode);
          res.json(result.data);
        });
    });

  app.route("/post/:id")
    .get((req, res) => {
      postsController.getById(req.params)
        .then(result => {
          res.status(result.statusCode);
          res.json(result.data);
        });
    })
    .put((req, res) => {
      postsController.update(req.body, req.params)
        .then(result => {
          res.status(result.statusCode);
          res.json(result.data);
        });
    })
    .delete((req, res) => {
      postsController.delete(req.params)
        .then(result => {
          res.sendStatus(result.statusCode);
        });
    });
};
