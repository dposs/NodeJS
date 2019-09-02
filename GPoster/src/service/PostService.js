let ImdbService = require("./ImdbService");
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
    this.imdbService = new ImdbService();
  }

  /**
   * Retorna as informações de Top Week Movies conforme source.
   *
   * @async
   * @param {string} source
   * @returns {Promise}
   * @memberof TorrentFreakService
   */
  async getTopWeekMoviesPost(source) {
    let movies = await this.torrentFreakService.getTopWeekMovies(source);
    
    for (let movie of movies) {
      let coverUrl = await this.imdbService.getCoverUrl(movie.imdbUrl);
      movie.setCoverUrl(coverUrl);
    }

    return movies;
  }
}

module.exports = PostService;