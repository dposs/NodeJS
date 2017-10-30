var HttpStatus = require("http-status");
var PostService = require("../service/PostService");

/**
 * Post Controller Class.
 * 
 * @class PostController
 */
class PostController {
  
  /**
   * Creates an instance of PostController.
   * 
   * @param {PostService} postService 
   * @memberof PostController
   */
  constructor(postService) {
    this.postService = postService || new PostService();
  }

  /**
   * Create a Post.
   * 
   * @param {IncomingMessage} req 
   * @param {ServerResponse} res 
   * @memberof PostController
   */
  create(req, res) {
    this.postService.create(req.body)
      .then(result => {
        res.status(HttpStatus.CREATED);
        res.json(result);
      })
      .catch(exception => {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY);
        res.send(exception.message);
      });
  }

  /**
   * Update a Post.
   * 
   * @param {IncomingMessage} req 
   * @param {ServerResponse} res 
   * @memberof PostController
   */
  update(req, res) {
    this.postService.update(req.body, req.params.id)
      .then(result => {
        res.status(HttpStatus.OK);
        res.json(result);
      })
      .catch(exception => {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY);
        res.send(exception.message);
      });
  }

  /**
   * Delete a Post.
   * 
   * @param {IncomingMessage} req 
   * @param {ServerResponse} res 
   * @memberof PostController
   */
  delete(req, res) {
    this.postService.delete(req.params.id)
      .then(result => {
        res.status(HttpStatus.NO_CONTENT);
        res.json(result);
      })
      .catch(exception => {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY);
        res.send(exception.message);
      });
  }

  /**
   * Get all Posts.
   * 
   * @param {IncomingMessage} req 
   * @param {ServerResponse} res 
   * @memberof PostController
   */
  getAll(req, res) {
    this.postService.getAll()
      .then(result => {
        res.status(HttpStatus.OK);
        res.json(result);
      })
      .catch(exception => {
        res.status(HttpStatus.BAD_REQUEST);
        res.send(exception.message);
      });
  }

  /**
   * Get a Post according to id.
   * 
   * @param {IncomingMessage} req 
   * @param {ServerResponse} res 
   * @memberof PostController
   */
  getById(req, res) {
    this.postService.getById(req.params.id)
      .then(result => {
        res.status(HttpStatus.OK);
        res.json(result);
      })
      .catch(exception => {
        res.status(HttpStatus.BAD_REQUEST);
        res.send(exception.message);
      });
  }
}

module.exports = PostController;