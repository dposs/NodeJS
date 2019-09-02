let superagent = require("superagent");
let xmldom = require("xmldom");
let xpath = require("xpath");

let DOMParser = xmldom.DOMParser;

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
    return xpath.select("string(//div[contains(concat('$', @class, '$'), '$poster$')]/a/img/@src)", doc);
  }
}

module.exports = ImdbService;