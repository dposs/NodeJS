var HttpStatus = require("http-status");

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => ({
  error: message,
  statusCode
});

class PostsController {

  constructor(app) {
    this.Post = app.datasource.models.Post;
  }

  getAll() {
    return this.Post.findAll({})
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  getById(params) {
    return this.Post.findOne({where: params})
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  create(data) {
    return this.Post.create(data)
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(data, params) {
    return this.Post.update(data, {where: params})
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params) {
    return this.Post.destroy({where: params})
    .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
    .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

module.exports = PostsController;
