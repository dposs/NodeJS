var config = {
  database: "test-app",
  username: "",
  password: "",
  params: {
    dialect: "sqlite",
    storage: "test-app.sqlite",
    logging: false,
    define: {
      underscored: true
    }
  },
};

module.exports = () => {
  return config;
}
