var config = {
  database: "test-app",
  username: "root",
  password: "5025",
  params: {
    host: "localhost",
    dialect: "mysql",
    logging: true,
    define: {
      underscored: true
    }
  },
};

module.exports = () => {
  return config;
}
