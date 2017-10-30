/**
 * Superclass of all Data Access Objects (DAOs).
 * 
 * @class GenericDAO
 */
class GenericDAO {
  
  /**
   * Creates an instance of GenericDAO.
   * 
   * @param {Object} Model 
   * @memberof GenericDAO
   */
  constructor(Model) {
    this.Model = Model;
  }

  /**
   * Create a Model.
   * 
   * @param {Object} model 
   * @returns {Promise<Object>} Promise of the created Model
   * @memberof GenericDAO
   */
  create(model) {
    return this.Model.create(model);
  }

  /**
   * Update a Model.
   * 
   * @param {Object} model 
   * @param {string} id 
   * @returns {Promise<int>} Promise of the count of updated Models
   * @memberof GenericDAO
   */
  update(model, id) {
    return this.Model.update(model, {where: {id}}).then(affectedRows => {
      return affectedRows[0];
    });
  }

  /**
   * Delete a Model.
   * 
   * @param {string} id 
   * @returns {Promise<int>} Promise of the count of deleted Models
   * @memberof GenericDAO
   */
  delete(id) {
    return this.Model.destroy({where: {id}});
  }

  /**
   * Get all Models.
   * 
   * @returns {Promise<Object[]>} Promise of Models
   * @memberof GenericDAO
   */
  getAll() {
    return this.Model.findAll({});
  }

  /**
   * Returns a Model according to id.
   * 
   * @param {string} id 
   * @returns {Promise<Object>} Model
   * @memberof GenericDAO
   */
  getById(id) {
    return this.Model.findOne({where: {id}});
  }
}

module.exports = GenericDAO;