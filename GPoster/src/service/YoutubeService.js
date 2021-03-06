let config = require("config");
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
    this.youtube = new Youtube(config.get("youtube.key"));
  }

  /**
   * Retorna o Id do Trailer de um Filme conforme Nome.
   *
   * @async
   * @param {string} name
   * @returns {Promise<string>}
   * @memberof YoutubeService
   */
  async getTrailerId(name) {
    return this.youtube.searchVideos(name + " trailer legendado", 1)
      .then(videos => videos && videos.length ? videos[0].id : null)
      .catch(console.log);
  }
}

module.exports = YoutubeService;