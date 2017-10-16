var HttpStatus = require("http-status");

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => ({
  error: message,
  statusCode
});

module.exports = (app) => {

  class PostController {

    constructor() {
      this.postService = new app.service.PostService();
    }

    getAll(req, res) {
      return this.postService.getAll()
        .then(result => {
          res.status(HttpStatus.OK);
          res.json(result);
        })
        .catch(error => {
          res.status(HttpStatus.BAD_REQUEST);
          res.send(error.stack);
        });
    }

    getById(params) {
      return this.postService.getById(params.id, (error, result) => {
        if (error) return errorResponse(error.message);
        return defaultResponse(result);
      });
    }

    create(data) {
      return this.postService.create(data, (error, result) => {
        if (error) {
          console.log(error.message);
          return errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return defaultResponse(result, HttpStatus.CREATED);
      });
    }

    update(data, params) {
      return this.postService.update(data, (error, result) => {
        if (error) return errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
        return defaultResponse(result);
      });
    }

    delete(params) {
      return this.postService.delete(id, (error, result) => {
        if (error) return errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
        return defaultResponse(result, HttpStatus.NO_CONTENT);
      });
    }
  }

  return PostController;
}
