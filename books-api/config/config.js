var config = {
  database: "books",
  username: "",
  password: "",
  params: {
    dialect: "sqlite",
    storage: process.env.NODE_ENV + '_books.sqlite',
    logging: false,
    define: {
      underscored: true
    }
  },
  jwtSecret: "Secret",
  jwtSession: {
    session: false
  }
};

module.exports = config;
