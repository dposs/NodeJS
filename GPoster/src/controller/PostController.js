let PostService = require("../service/PostService");

/**
 * Controller de Post.
 *
 * @class PostController
 */
class PostController {

  /**
   * Cria uma instancia de PostController.
   * 
   * @memberof PostController
   */
  constructor() {
    this.postService = new PostService();
  }

  /**
   * Retorna o HTML para o Post: Top Movies.
   *
   * @async
   * @param {IncomingMessage} request 
   * @param {ServerResponse} response 
   * @returns {Promise<string>}
   * @memberof PostController
   */
  async getTopWeekMovies(request, response) {
    let source = request.body.source;

    if (!source) {
      throw new Error("Parâmetro 'source' obrigatório.");
    }

    this.postService.getTopWeekMovies(source);
  }
}

module.exports = PostController;