let ImdbService = require("./ImdbService");
let TorrentFreakService = require("./TorrentFreakService");
let YoutubeService = require("./YoutubeService");

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
    this.imdbService = new ImdbService();
    this.torrentFreakService = new TorrentFreakService();
    this.youtubeService = new YoutubeService();
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
      let youtubeUrl = await this.youtubeService.getTrailerUrl(movie.name);
      
      movie.setCoverUrl(coverUrl);
      
      if (youtubeUrl) {
        movie.setYoutubeUrl(youtubeUrl);
      }
    }

    return movies;
  }
}

module.exports = PostService;