module.exports = (app) => {

  var Post = app.model.Post;
  var Result = app.model.common.Result;

  class PostDAO {

    findAll() {
      return Post.findAll({})
        .then(result => result)
        .catch(error => error);
    }

    findOne(id) {
      return Post.findOne({where: {id}})
        .then(result => new Result(result))
        .catch(error => new Result().catch(error));
    }

    create(post) {
      return Post.create(post)
        .then(result => new Result(result))
        .catch(error => new Result().catch(error));
    }

    update(post, id) {
      return Post.update(post, {where: {id}})
        .then(result => new Result(result))
        .catch(error => new Result().catch(error));
    }

    destroy(id) {
      return Post.destroy({where: {id}})
        .then(result => new Result(result))
        .catch(error => new Result().catch(error));
    }
  }

  return PostDAO;
}
