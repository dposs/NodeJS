var Sequelize = require("sequelize");
var fs = require("fs");
var path = require("path");

let datasource = null;

module.exports = (app) => {
  if (!datasource) {
    const config = app.infra.config;
    const sequelize = new Sequelize(
      config.datasource,
      config.username,
      config.password,
      config.params
    );

    datasource = {
      sequelize,
      Sequelize,
    };

    sequelize.sync();
  }

  return datasource;
}
