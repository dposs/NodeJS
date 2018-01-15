class ProdutoDAO {

  constructor(connectionFactory) {
    this.connectionFactory = connectionFactory;
  }

  getAll(callback) {
    var connection = this.connectionFactory.createConnection();
    connection.query("select * from livros", callback);
    connection.end();
  }

  insert(produto, callback) {
    var connection = this.connectionFactory.createConnection();
    connection.query('insert into livros set ?', produto, callback);
    connection.end();
  }

  delete(params, callback) {
    var connection = this.connectionFactory.createConnection();
    connection.query('delete from livros where ?', produto, callback);
    connection.end();
  }
}

module.exports = () => {
  return ProdutoDAO;
}
