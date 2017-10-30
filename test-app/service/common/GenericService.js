var Logger = require("../../infra/Logger");

/**
 * Superclass of all Services.
 * 
 * @class GenericService
 */
class GenericService {
    
    /**
     * Creates an instance of GenericService.
     * 
     * @param {PostDAO} daoInstance 
     * @memberof GenericService
     */
    constructor(daoInstance) {
        this.dao = daoInstance;
        this.logger = Logger.getInstance();
    }

    setDAO(daoInstance) {
        this.dao = daoInstance;
        return this;
    }

    /**
     * Create the model.
     * 
     * @param {Object} model 
     * @returns {Promise<Object>} Promise of the created Model
     * @memberof GenericService
     */
    create(model) {
        return this.dao.create(model)
        .catch(e => {
            logger.exception(e);
            throw e;
        });
    }

    /**
     * Update the model.
     * 
     * @param {Object} model Model
     * @param {string} id Model id
     * @returns {Promise<int>} Promise of the count of updated Models
     * @memberof GenericService
     */
    update(model, id) {
        return this.getById(id)
        .then(found => {
            if (found) return this.dao.update(model, id);
            else throw new Error("Record not found for update.");
        })
        .catch(e => {
            this.logger.exception(e);
            throw e;
        });
    }

    /**
     * Delete the Model.
     * 
     * @param {string} id Model id
     * @returns {Promise<int>} Promise of the count of deleted Models
     * @memberof GenericService
     */
    delete(id) {
        return this.dao.delete(id)
        .catch(e => {
            this.logger.exception(e);
            throw e;
        });
    }

    /**
     * Returns all Models.
     * 
     * @returns {Promise<Object[]>} Promise of Models
     * @memberof GenericService
     */
    getAll() {
        return this.dao.getAll()
        .catch(e => {
            this.logger.exception(e);
            throw e;
        });
    }

    /**
     * Returns a Model according to id.
     * 
     * @param {string} id Model id
     * @returns {Promise<Object>} Model
     * @memberof GenericService
     */
    getById(id) {
        return this.dao.getById(id)
        .catch(e => {
            this.logger.exception(e);
            throw e;
        });
    }
}

module.exports = GenericService;