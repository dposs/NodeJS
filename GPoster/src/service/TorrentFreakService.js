let superagent = require("superagent");
let xmldom = require("xmldom");
let xpath = require("xpath");

let DOMParser = xmldom.DOMParser;

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
    let response = await superagent.get(url);
    let html = response.res.text.replace(/\n/g, "");

    let noErrors = {
      "errorHandler": {
        "warning": function() {}, 
        "error": function() {}, 
        "fatalError": function() {}
      }
    };

    var doc = new DOMParser(noErrors).parseFromString(html);
    var rows = xpath.select("//div[contains(@class, 'entry-content')]/table/tbody/tr", doc);
    
    let movies = new Array();

    for (let row of rows) {
      movies.push(new Movie()
        .setName(xpath.select("string(td[3])", row))
        .setRank(xpath.select("string(td[1])", row))
        .setRankLast(xpath.select("string(td[2])", row))
        .setImdbScore(xpath.select("string(td[4]/a[1])", row))
        .setImdbUrl(xpath.select("string(td[4]/a[1]/@href)", row))
        .setYoutubeUrl(xpath.select("string(td[4]/a[2]/@href)", row))
      );
    }

    return movies;
  }
}

module.exports = TorrentFreakService;