var DataSource = require("../infra/DataSource");

var Sequelize = DataSource.getInstance().Sequelize;
var sequelize = DataSource.getInstance().sequelize;

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

module.exports = Post;
