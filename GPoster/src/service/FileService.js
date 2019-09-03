let fs = require("fs");

/**
 * Service de Arquivo.
 *
 * @class FileService
 */
class FileService {

  /**
   * Cria uma instancia de FileService.
   *
   * @memberof FileService
   */
  constructor() {
    this.BASE_PATH = process.cwd();
  }

  /**
   * Efetua a leitura e retorna o conteúdo do arquivo.
   *
   * @param {string} file
   * @returns {string}
   * @memberof FileService
   */
  read(file) {
    return fs.readFileSync(this.BASE_PATH + file, {encoding: "UTF-8"});
  }

  /**
   * Efetua o armazenamento do arquivo.
   * 
   * @param {string} file
   * @param {string} data
   * @memberof FileService
   */
  write(file, data) {
    fs.writeFileSync(this.BASE_PATH + file, data, {encoding: "UTF-8"});
  }
}

module.exports = FileService;