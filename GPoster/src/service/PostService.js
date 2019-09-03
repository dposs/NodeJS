let fs = require("fs");

let ejs = require("ejs");
let moment = require("moment");

let FileService = require("./FileService");
let ImdbService = require("./ImdbService");
let TorrentFreakService = require("./TorrentFreakService");
let YoutubeService = require("./YoutubeService");

/**
 * Service de Post.
 *
 * @class PostService
 */
class PostService {

  /**
   * Cria uma instancia de PostService.
   *
   * @memberof PostService
   */
  constructor() {
    this.fileService = new FileService();
    this.imdbService = new ImdbService();
    this.torrentFreakService = new TorrentFreakService();
    this.youtubeService = new YoutubeService();
  }

  /**
   * Retorna as informações de Top Week Movies conforme source.
   *
   * @async
   * @param {string} source
   * @returns {Promise}
   * @memberof TorrentFreakService
   */
  async getTopWeekMoviesPost(source) {
    let movies = await this.torrentFreakService.getTopWeekMovies(source);
    
    for (let movie of movies) {
      let coverUrl = await this.imdbService.getCoverUrl(movie.imdbUrl);
      let youtubeVideoId = await this.youtubeService.getTrailerId(movie.name);
      
      movie.setCoverUrl(coverUrl);
      
      if (youtubeVideoId) {
        movie.setYoutubeVideoId(youtubeVideoId);
      }
    }

    // Date

    let date = moment(source.match(/\d{2}-\d{2}-\d{2}/g)[0], "MM-DD-YY");

    let from = date.clone().subtract(7, "days");
    let to = date.clone().subtract(1, "days");

    // HTML Rendering

    let template = this.fileService.read("/resource/html/topweekmovies.html");
    let html = ejs.render(template, {movies, from, to});

    // Output

    this.fileService.write("/output/topweekmovies/" + date.format("YYYY-MM-DD") + ".html", html);

    return {
      "from": from.format("DD"), 
      "to": to.format("DD"),
      "month": to.format("MMMM"),
      "movies": movies
    };
  }
}

module.exports = PostService;