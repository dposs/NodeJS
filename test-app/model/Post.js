module.exports = (app) => {

  var Sequelize = app.infra.datasource.Sequelize;
  var sequelize = app.infra.datasource.sequelize;

  const Post = sequelize.define("Post", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    subject: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  return Post;
}
