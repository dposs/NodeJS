var mysql = require("mysql");

class ConnectionFactory {

  createConnection() {
    if (process.env.NODE_ENV == "local") {
      return mysql.createConnection({
              host: "localhost",
              user: "root",
              password: "root",
              database: "casadocodigos"
      });
    }

    if (process.env.NODE_ENV == "test") {
      return mysql.createConnection({
              host: "localhost",
              user: "root",
              password: "root",
              database:"casadocodigo_test"
      });

    if (process.env.NODE_ENV == "production") {
      return mysql.createConnection({
              host: 'us-cdbr-iron-east-03.cleardb.net',
              user:'cdd75da8535f66',
              password:'g2a35b88',
              database:'heroku_db9452fds6ahdog'
      });
    }
  }
}

module.exports = () => {
  return ConnectionFactory;
}
