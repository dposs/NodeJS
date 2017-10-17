module.exports = (app) => {

  class GenericDAO {

    constructor(Model) {
      this.Model = Model;
    }

    create(model) {
      return this.Model.create(model);
    }

    update(model, id) {
      return this.Model.update(model, {where: {id}}).then(affectedRows => {
        return affectedRows[0];
      });
    }

    delete(id) {
      return this.Model.destroy({where: {id}});
    }

    getAll() {
      return this.Model.findAll({});
    }

    getById(id) {
      return this.Model.findOne({where: {id}});
    }
  }

  return GenericDAO;
}
