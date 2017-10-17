var HttpStatus = require("http-status");

module.exports = (app) => {

  class PostController {

    constructor() {
      this.postService = new app.service.PostService();
    }

    getAll(req, res) {
      this.postService.getAll()
        .then(result => {
          res.status(HttpStatus.OK);
          res.json(result);
        })
        .catch(exception => {
          res.status(HttpStatus.BAD_REQUEST);
          res.send(exception.message);
        });
    }

    getById(req, res) {
      this.postService.getById(req.params.id)
        .then(result => {
          res.status(HttpStatus.OK);
          res.json(result);
        })
        .catch(exception => {
          res.status(HttpStatus.BAD_REQUEST);
          res.send(exception.message);
        });
    }

    create(req, res) {
      this.postService.create(req.body)
        .then(result => {
          res.status(HttpStatus.CREATED);
          res.json(result);
        })
        .catch(exception => {
          res.status(HttpStatus.UNPROCESSABLE_ENTITY);
          res.send(exception.message);
        });
    }

    update(req, res) {
      this.postService.update(req.body, req.params.id)
        .then(result => {
          res.status(HttpStatus.OK);
          res.json(result);
        })
        .catch(exception => {
          res.status(HttpStatus.UNPROCESSABLE_ENTITY);
          res.send(exception.message);
        });
    }

    delete(req, res) {
      this.postService.delete(req.params.id)
        .then(result => {
          res.status(HttpStatus.NO_CONTENT);
          res.json(result);
        })
        .catch(exception => {
          res.status(HttpStatus.UNPROCESSABLE_ENTITY);
          res.send(exception.message);
        });
    }
  }

  return PostController;
}
