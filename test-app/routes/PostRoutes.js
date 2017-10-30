var PostController = require("../controller/PostController");

module.exports = (app) => {

  var postController = new PostController();

  app.route("/posts")
    .get((req, res) => {
      postController.getAll(req, res);
    })
    .post((req, res) => {
      postController.create(req, res);
    });

  app.route("/post/:id")
    .get((req, res) => {
      postController.getById(req, res);
    })
    .put((req, res) => {
      postController.update(req, res);
    })
    .delete((req, res) => {
      postController.delete(req, res);
    });
};
