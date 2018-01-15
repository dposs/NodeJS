var mysql = require("mysql");

class ConnectionFactory {

  createConnection() {
    if (process.env.NODE_ENV == "local") {
      return mysql.createConnection({
              host: "localhost",
              user: "root",
              password: "root",
              database: "casadocodigo"
      });
    }

    if (process.env.NODE_ENV == "test") {
      return mysql.createConnection({
              host: "localhost",
              user: "root",
              password: "root",
              database:"casadocodigo_test"
      });
    }
  }
}

module.exports = () => {
  return ConnectionFactory;
}
