let bodyParser = require("body-parser");
let express = require("express");
let moment = require("moment");

/**
 * Biblioteca de Gerenciamento do Servidor.
 *
 * Funcoes obrigatorias:
 * - Funcao 'get port()'.
 *
 * Eventos opcionais:
 * - Evento 'onServerCreate()'.
 * - Evento 'onServerStart()'.
 *
 * @requires module:express
 * @requires module:i18next
 *
 * @class Server
 */
class Server {

  /**
   * Cria uma instancia do Servidor informado.
   *
   * @static
   * @param {string} name
   * @returns {Object<? extends Server>}
   * @memberof Server
   */
  static create(name) {
    let Server = this;
    let server = Object.assign(new Server(), {name});

    server.express = express();
    server.onServerCreate();

    moment.locale("pt-BR");

    return server;
  }

  /**
   * Inicia o Servidor.
   *
   * @returns {Server}
   * @memberof Server
   */
  start() {
    this.onServerStart();

    this.express.listen(this.port, () => {
      this.showStartupInfo();
    });

    return this;
  }

  /**
   * Retorna a porta do Servidor.
   *
   * @abstract
   * @readonly
   * @returns {int}
   * @throws {InternalError} A função abstrata 'get port()' deve ser implementada no Server.
   * @memberof Server
   */
  get port() {
    return 80;
  }

  /**
   * Evento disparado no momento de criacao do Servidor.
   *
   * @returns {Server}
   * @memberof Server
   */
  onServerCreate() {
    return this;
  }

  /**
   * Evento disparado no momento de inicializacao do Servidor.
   *
   * @returns {Server}
   * @memberof Server
   */
  onServerStart() {
    this.initializeMiddlewares();
    this.initializeRoutes();

    return this;
  }

  /**
   * Inicializa os Middlewares do Express.
   *
   * @memberof Server
   */
  initializeMiddlewares() {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({"extended": true}));
  }

  /**
   * Inicializa as Rotas.
   *
   * @memberof Server
   */
  initializeRoutes() {
    let PostController = require("../controller/PostController");

    let postController = new PostController();

    // Guest Routes

    let guest = express.Router();

    guest.route("/post/topweekmovies")
      .get((request, response, next) => postController.getTopWeekMoviesPost(request, response).catch(next));

    // Set Routers

    this.express.use("/", guest);

    // 404 Error

    this.express.all("*", (request, response, next) => {
      next(new Error("Recurso inexistente: " + request.originalUrl));
    });
  }

  /**
   * Exibe informacao de inicializacao do Servidor.
   *
   * @memberof Server
   */
  showStartupInfo() {
    let size = this.name.length + 12;

    console.log(" -----" + "".padEnd(size, "-"));
    console.log("|     " + "".padEnd(size, " ") + "|");
    console.log("|     " + this.name + " ONLINE" + "     |");
    console.log("|     PORTA: " + this.port.toString().padEnd(size - 7, " ") + "|");
    console.log("|     " + "".padEnd(size, " ") + "|");
    console.log(" -----" + "".padEnd(size, "-"));
  }
}

module.exports = Server;