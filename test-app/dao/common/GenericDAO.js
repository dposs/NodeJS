module.exports = (app) => {

  class GenericDAO {

    constructor(Model) {
      this.Model = Model;
    }

    getAll() {
      return this.Model.findAll({});
    }

    getById(id) {
      return this.Model.findOne({where: {id}});
    }

    create(model) {
      return this.Model.create(model);
    }

    update(model, id) {
      return this.Model.update(model, {where: {id}});
    }

    delete(id) {
      return this.Model.destroy({where: {id}});
    }
  }

  return GenericDAO;
}
