let HttpStatus = require("http-status");

let FileService = require("../service/FileService");
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
    this.fileService = new FileService();
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
  async getTopWeekMoviesPost(request, response) {
    let source = request.body.source;

    if (!source) {
      throw new Error("Parâmetro 'source' obrigatório.");
    }

    let post = await this.postService.getTopWeekMoviesPost(source);

    console.log("Tópico 'Top Week Movies' gerado com sucesso.");

    return response.status(HttpStatus.OK).json(post);
  }
}

module.exports = PostController;