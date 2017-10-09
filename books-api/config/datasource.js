var Sequelize = require("sequelize");
var fs = require("fs");
var path = require("path");

let database = null;

const loadModels = (sequelize) => {
  const dir = path.join(__dirname, "../models");
  let models = [];

  fs.readdirSync(dir).forEach(file => {
    const modelDir = path.join(dir, file);
    const model = sequelize.import(modelDir);
    models[model.name] = model;
  });

  return models;
};

module.exports = (app) => {
  if (!database) {
    const config = app.config;
    const sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config.params
    );

    database = {
      sequelize,
      Sequelize,
      models: loadModels(sequelize)
    };

    sequelize.sync();
  }

  return database;
}
