const mineflayer = require("mineflayer");
const { mineflayer: mineflayerViewer } = require("prismarine-viewer");

const SERVER = "200.9.154.172"
const USERNAME = "Apocalipse";
const PASSWORD = "502510";

var self = this;

const bot = mineflayer.createBot({
  host: SERVER, // minecraft server ip
  username: USERNAME, // minecraft username
  // password: "502510", // minecraft password, comment out if you want to log into online-mode=false servers
  // port: 25565, // only set if you need a port that isn"t 25565
  version: "1.16.5", // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it"s set automatically
  // auth: "mojang" // only set if you need microsoft auth, then set this to "microsoft"
});

bot.loadPlugin(require("mineflayer-dashboard")({
  chatPattern: /.*/g
}));

bot.once("inject_allowed", () => {
  global.console.log = bot.dashboard.log
  global.console.error = bot.dashboard.log
});

/**
 * Whisper Event.
 */
bot.on("whisper", (username, message) => {
  var answers = ["Opa", "fala", "oi?", "oi", "opa", "e ae"];
  var answer = answers[Math.floor(Math.random() * answers.length)];

  bot.dashboard.log(username + ": " + message);

  delay(() => bot.whisper(username, answer)).then(() => {
    delay(() => bot.quit(username + " sent: " + message), {minimum: 3000});
  });
});

bot.once("spawn", () => {
  mineflayerViewer(bot, {port: 3000, firstPerson: true});
  delay(() => self.chat("/login " + PASSWORD));
});

/**
 * Send and log a chat message.
 *
 * @param {string} message
 * @param {boolean} [options.log = true]
 */
function chat(message, options) {
  let {log = true} = options;

  bot.chat(command);
  if (log) bot.dashboard.log(command);
}

/**
 * Execute a function with delayed amount or minimum.
 * Delay padrão: 5 a 10 segundos.
 *
 * @param {Function} fn
 * @param {int} [options.amount] Milliseconds
 * @param {int} [options.minimum = 5000] Milliseconds
 * @returns {Promise}
 */
async function delay(fn, options = {}) {
  return new Promise((resolve, reject) => {
    try {
      let {amount, minimum = 5000} = options;
      let delay = amount || ((Math.random() * 10000) / 2) + minimum;
      
      setTimeout(() => {
        fn();
        resolve();
      }, delay);

    } catch (error) {
      reject(error);
    }
  });
}