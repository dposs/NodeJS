module.exports = (app) => {

  var promiseFactory = new app.model.common.PromiseFactory();

  class PostService {

    constructor() {
      this.postDAO = new app.dao.PostDAO();
    }

    getAllBackup() {
      return new Promise((resolve, reject) => {

        this.postDAO.findAll()
          .then(result => {
            console.log(Object.keys(result).length + " registro(s) encontrado(s).");
            resolve(result);
          })
          .catch(error => reject(error));
      });

      promiseFactory.create
    }

    getAll() {
      return promiseFactory.create(this.postDAO.findAll())
        .then(result => {
          console.log(Object.keys(result).length + " registro(s) encontrado(s).");
          resolve(result);
        })
        .catchh(error => reject(error))
        .promise();
    }

    getById(id, done) {
      return this.postDAO.findOne(id, callback);
    }

    create(post, done) {
      return this.postDAO.create(post, callback);
    }

    update(post, id, done) {
      return this.postDAO.update(post, id);
    }

    delete(id, done) {
      return this.postDAO.destroy(id, callback);
    }
  }

  return PostService;
}
