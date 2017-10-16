var mysql = require("mysql");

class ConnectionFactory {

  createConnection() {
    return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'casadocodigo'
    });
  }
}

module.exports = () => {
  return ConnectionFactory;
}
