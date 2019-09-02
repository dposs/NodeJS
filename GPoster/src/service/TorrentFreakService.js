let superagent = require("superagent");

/**
 * Service para comunicação com Torrent Freak.
 *
 * @class TorrentFreakService
 */
class TorrentFreakService {

  /**
   * Retorna as informações de Top Week Movies conforme url.
   *
   * @async
   * @param {string} url
   * @returns {Promise<TorrentFreakMovie[]>}
   * @memberof TorrentFreakService
   */
  async getTopWeekMovies(url) {
    let response = await superagent.get(url);
    let html = response.res.text;
    return html;
  }
}

module.exports = TorrentFreakService;