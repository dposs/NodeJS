/**
 * Filme do Torrent Freak.
 *
 * @class TorrentFreakMovie
 */
class TorrentFreakMovie {

  /**
   * Cria uma instancia de TorrentFreakMovie.
   * 
   * @param {Object} [data]
   * @memberof TorrentFreakMovie
   */
  constructor(data) {
    Object.assign(this, {
      "name": null,
      "position": null,
      "lastPosition": null,
      "imdbScore": null,
      "imdbLink": null,
      "youtubeLink": null
    }, data || {});
  }
}

module.exports = TorrentFreakMovie;