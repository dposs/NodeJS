let config = require("config");
let Youtube = require("simple-youtube-api");
let GoogleService = require("./GoogleService");
var {google} = require("googleapis");

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
    this.googleService = new GoogleService();
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
    /*return this.youtube.searchVideos(name + " trailer legendado", 1)
      .then(videos => videos && videos.length ? videos[0].id : null)
      .catch(console.log);*/

    let service = google.youtube("v3");
    let response = await service.search.list({
      auth: await this.googleService.getAuthorization(),
      part: "snippet",
      maxResults: 1
    });

    var videos = response.data.items;
    if (videos.length == 0) {
      console.log('No video found.');
      return;
    } else {
      return videos[0];
    }
  }
}

module.exports = YoutubeService;