var GenericService = require("./common/GenericService");
var PostDAO = require("../dao/PostDAO");

/**
 * Post Service Class.
 * 
 * @class PostService
 * @extends {GenericService}
 */
class PostService extends GenericService {
  
  /**
   * Creates an instance of PostService.
   * 
   * @memberof PostService
   */
  constructor() {
    super(new PostDAO());
  }
}

module.exports = PostService;