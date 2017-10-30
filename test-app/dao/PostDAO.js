var GenericDAO = require("./common/GenericDAO");
var Post = require("../model/Post");

/**
 * Post Data Access Object (DAO) Class.
 * 
 * @class PostDAO
 * @extends {GenericDAO}
 */
class PostDAO extends GenericDAO {

  /**
   * Creates an instance of PostDAO.
   * 
   * @memberof PostDAO
   */
  constructor() {
    super(Post)
  }
}

module.exports = PostDAO;