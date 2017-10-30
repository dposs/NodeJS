var Sequelize = require("sequelize");

class DataSource {

  constructor() {
    throw new Error("Singleton classes can't be instantied.");
  }

  static getInstance(database) {
    if (!DataSource.instance) {
      DataSource.initialize(database);
    }
    return DataSource.instance;
  }

  static initialize(database) {
    this.Sequelize = Sequelize;
    this.sequelize = new Sequelize(
      database.name,
      database.username,
      database.password,
      database.params
    );

    this.sequelize.sync();

    DataSource.instance = this;
  }
}

module.exports = DataSource;
