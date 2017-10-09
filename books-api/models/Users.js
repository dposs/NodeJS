var bcrypt = require("bcrypt");

module.exports = (sequelize, DataType) => {
  const Users = sequelize.define("Users", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  },
  {
    hooks: {
      beforeCreate: user => {
        const salt = bcrypt.genSaltSync();
        user.set("password", bcrypt.hashSync(user.password, salt));
      }
    },
    scopes: {
      public: {
        attributes: ['id', 'name', 'email', 'password']
      }
    }
  });

  Users.prototype.isPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  return Users;
}
