module.exports = (app) => {

  var GenericDAO = app.dao.common.GenericDAO;

  class PostDAO extends GenericDAO {

    constructor() {
      super(app.model.Post);
    }
  }

  return PostDAO;
}
