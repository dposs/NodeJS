let TorrentFreakService = require("./TorrentFreakService");

/**
 * Service de Post.
 *
 * @class PostService
 */
class PostService {

  /**
   * Cria uma instancia de PostService.
   *
   * @memberof PostService
   */
  constructor() {
    this.torrentFreakService = new TorrentFreakService();
  }

  /**
   * Retorna as informações de Top Week Movies conforme source.
   *
   * @async
   * @param {string} source
   * @returns {Promise}
   * @memberof TorrentFreakService
   */
  async getTopWeekMovies(source) {
    let data = await this.torrentFreakService.getTopWeekMovies(source);
  }
}

module.exports = PostService;