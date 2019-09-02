/**
 * Filme.
 *
 * @class Movie
 */
class Movie {

  /**
   * Cria uma instancia de Movie.
   * 
   * @param {Object} [data]
   * @memberof Movie
   */
  constructor(data) {
    Object.assign(this, {
      "name": null,
      "rank": null,
      "rankLast": null,
      "imdbScore": null,
      "imdbUrl": null,
      "youtubeUrl": null,
      "coverUrl": null
    }, data || {});
  }

  setName(name) {
    return Object.assign(this, {name});
  }

  setRank(rank) {
    return Object.assign(this, {rank});
  }

  setRankLast(rankLast) {
    rankLast = rankLast.replace(/[\(\)]/g, "");

    if (!new RegExp(/\d{1,2}/).test(rankLast)) {
      rankLast = null;
    }

    return Object.assign(this, {rankLast});
  }

  setImdbScore(imdbScore) {
    return Object.assign(this, {imdbScore});
  }
  
  setImdbUrl(imdbUrl) {
    return Object.assign(this, {imdbUrl});
  }

  setYoutubeUrl(youtubeUrl) {
    return Object.assign(this, {youtubeUrl});
  }

  setCoverUrl(coverUrl) {
    return Object.assign(this, {coverUrl});
  }
}

module.exports = Movie;