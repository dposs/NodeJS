let osmosis = require("osmosis");

/**
 * Service de comunicação com IMDB.
 *
 * @class ImdbService
 */
class ImdbService {

  /**
   * Retorna o Url da Imagem de Capa do Filme conforme Url do Filme no IMDB.
   *
   * @param {*} imdbId
   * @memberof ImdbService
   */
  async getCoverUrl(url) {
    let coverUrl;

    await osmosis
      .get(url)
      .find("//div[contains(concat('$', @class, '$'), '$poster$')]/a/img/@src")
      .set("coverUrl")
      .data(data => coverUrl = data.coverUrl)
      .log(console.log)
      .error(console.log)
      .debug(console.log);
    
    return coverUrl;
  }
}

module.exports = ImdbService;