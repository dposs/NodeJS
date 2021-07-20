const moment = require("moment-timezone");
const tmi = require("tmi.js");
const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  timestamp: true,
  format: winston.format.combine(
    winston.format.timestamp({
      format: () => moment().tz("America/Sao_Paulo").format("DD-MM-YYYY HH:mm:ss")
    }),
    winston.format.printf(({level, message, label, timestamp}) => `${timestamp}: ${message}`)
  ),
  transports: [
    new winston.transports.File({filename: moment().tz("America/Sao_Paulo").format("YYYY-MM-DD") + ".log", level: "info"})
  ],
});

// Define configuration options
const opts = {
  options: {
    debug: false
  },
  connection: {
    reconnect: true
  },
  identity: {
    username: "neobladeg3x",
    password: "oauth:8j5t5obasf50qf6x07w1kmv74qn38i"
  },
  channels: [
   "SamIAmPHX"
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

// Connect to Twitch
client.connect();

let count = 0;

// Called every time a message comes in
function onMessageHandler(channel, tags, message, self) {
  if (self) return; // Ignore messages from self

  // Remove whitespace from chat message
  let name = tags["display-name"];
  let command = message.trim();

  if (name == "SamIAmPHX" && command == "!raffle") {
    logger.info("Raffle: " + (++count));
    setTimeout(() => client.say(channel, "!gib"), 7000 + (Math.random() * 10000));
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}