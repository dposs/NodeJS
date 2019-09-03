
let Youtube = require("simple-youtube-api");

/**
 * Service de comunicação com Youtube.
 *
 * @class YoutubeService
 */
class YoutubeService {

  /**
   * Cria uma instancia de YoutubeService.
   *
   * @memberof YoutubeService
   */
  constructor() {
    this.API_KEY = "AIzaSyC9AxaE_WmJh5yPRNiHqC-eo_dudlvidaU";
    this.youtube = new Youtube(this.API_KEY);
  }

  /**
   * Retorna a Url do Trailer de um Filme conforme Nome.
   *
   * @async
   * @param {string} name
   * @returns {Promise<string>}
   * @memberof YoutubeService
   */
  async getTrailerUrl(name) {
    return this.youtube.searchVideos(name + " trailer legendado", 1)
      .then(videos => videos && videos.length ? videos[0].url : null)
      .catch(console.log);
  }
}

module.exports = YoutubeService;