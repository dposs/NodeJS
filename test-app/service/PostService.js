module.exports = (app) => {

  class PostService {

    constructor() {
      this.postDAO = new app.dao.PostDAO();
    }

    create(post) {
      return this.postDAO.create(post);
    }

    update(post, id) {
      return this.getById(id).then(foundPost => {
        if (foundPost) return this.postDAO.update(post, id);
        throw new Error("Post não localizado.");
      });
    }

    delete(id) {
      return this.postDAO.delete(id);
    }

    getAll() {
      return this.postDAO.getAll();
    }

    getById(id) {
      return this.postDAO.getById(id);
    }
  }

  return PostService;
}
