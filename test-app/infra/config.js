const winston = require('winston');
var CloudWatchTransport = require('winston-aws-cloudwatch');

var config = {

  database: {
    name: "test-app",
    username: "root",
    password: "5025",
    params: {
      host: "localhost",
      dialect: "mysql",
      logging: true,
      define: {
        underscored: true
      }
    }
  },

  log: {
    level: 'silly',
    transports: [
      new winston.transports.Console({
        colorize: true
      }),
      new winston.transports.File({
        filename: 'logs/server.log',
        colorize: false,
        json: false,
        maxsize: 10485760, // 10 mb (1024 * 1024 * 10) 10485760
        maxFiles: 10,
        tailable: true,
        zippedArchive: true
      }),
      new CloudWatchTransport({
        name: "cloudwatch",
        logGroupName: "APILogs",
        logStreamName: "APIDesenvolvimento",
        createLogGroup: true,
        createLogStream: true,
        submissionInterval: 2000,
        batchSize: 20,
        colorize: false,
        awsConfig: {
          accessKeyId: "AKIAJHCMVSBOO5JKBE6A",
          secretAccessKey: "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",
          region: "us-east-1"
        }
      })
    ]
  }
};

module.exports = config;