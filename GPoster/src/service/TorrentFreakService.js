let osmosis = require("osmosis");

let Movie = require("../data/Movie");

/**
 * Service de comunicação com Torrent Freak.
 *
 * @class TorrentFreakService
 */
class TorrentFreakService {

  /**
   * Retorna as informações de Top Week Movies conforme Url do Artigo no TorrentFreak.
   *
   * @async
   * @param {string} url
   * @returns {Promise<Movie[]>}
   * @memberof TorrentFreakService
   */
  async getTopWeekMovies(url) {
    let movies = new Array();

    await osmosis
      .get(url)
      .find("//div[contains(@class, 'article__body')]/table/tbody/tr")
      .set({
        "name": "td[3]",
        "rank": "td[1]",
        "rankLast": "td[2]",
        "imdbScore": "td[4]/a[1]",
        "imdbUrl": "td[4]/a[1]/@href",
        "youtubeVideoUrl": "td[4]/a[2]/@href",
      })
      .data(data => {
        let youtubeVideoId = data.youtubeVideoUrl.match(/v\=(.*)/)[1];

        movies.push(new Movie()
          .setName(data.name)
          .setRank(data.rank)
          .setRankLast(data.rankLast)
          .setImdbScore(data.imdbScore)
          .setImdbUrl(data.imdbUrl)
          .setYoutubeVideoId(youtubeVideoId)
        );
      })
      .log(console.log)
      .error(console.log)
      .debug(console.log);

    return movies;
  }
}

module.exports = TorrentFreakService;