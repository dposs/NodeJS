const mineflayer = require("mineflayer");
const { mineflayer: mineflayerViewer } = require("prismarine-viewer");

/**
 * Accounts
 * - HomePC: Apocalipse:5025.. / Neoblade:Da**31****
 * - WorkPC: RamiroG3X:6469..
 */
const SERVER = "200.9.154.172"
const USERNAME = "Apocalipse";
const PASSWORD = "502510";

const bot = mineflayer.createBot({
  host: SERVER,
  username: USERNAME,
  version: "1.16.5", // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it"s set automatically
  // password: "123456", // minecraft password, comment out if you want to log into online-mode=false servers
  // port: 25565, // only set if you need a port that isn"t 25565
  // auth: "mojang" // only set if you need microsoft auth, then set this to "microsoft"
});

bot.loadPlugin(require("mineflayer-dashboard")({
  chatPattern: /.*/g
}));

bot.once("inject_allowed", () => {
  global.console.log = bot.dashboard.log
  global.console.error = bot.dashboard.log
});

// @todo mensagens com "]" no meio
bot.addChatPattern("tell", new RegExp(".{1}\] (.*) \→ Apocalipse\» (.*)"), {parse: true});

/**
 * Tell Event.
 */
bot.on("chat:tell", (matches) => {
  matches.forEach(match => {
    let username = match[0];
    let message = match[1];

    var answers = ["Opa", "fala", "oi?", "oi", "opa", "e ae", "dae"];
    var answer = answers[Math.floor(Math.random() * answers.length)];

    bot.dashboard.log(username + ": " + message);
    
    delay(() => bot.whisper(username, answer), {max: 8000}).then(() => {
      bot.dashboard.log("/tell " + username + " " + answer);
      return delay(() => bot.quit(), {min: 3000, max: 5000});
    }).then(() => {
      bot.dashboard.log("quited");
    });
  });
});

bot.on("whisper", (username, message) => {
  bot.dashboard.log("whisper");
  bot.dashboard.log(username + ": " + message);
});

bot.on("chat:whisper", (username, message) => {
  bot.dashboard.log("cat:whisper");
  bot.dashboard.log(username + ": " + message);
});

bot.once("spawn", () => {
  mineflayerViewer(bot, {port: 3000, firstPerson: true});
  login();
});

/**
 * Log user in and enter Genesis Server.
 *
 * @returns
 */
async function login() {
  return delay(() => chat("/login " + PASSWORD))
    .then(() => {
      return delay(() => bot.setQuickBarSlot(4), {min: 2000, max: 4000});
    })
    .then(() => {
      return delay(() => bot.activateItem(), {min: 2000, max: 4000});
    })
    .then(() => {
      return delay(() => bot.clickWindow(10, 0, 0), {min: 2000, max: 4000});
    });
}

/**
 * Send and log a chat message.
 *
 * @param {string} message
 * @param {boolean} [options.log = true]
 */
function chat(message, options = {}) {
  let {log = true} = options;

  bot.chat(message);
  if (log) bot.dashboard.log(message);
}

/**
 * Execute a function with delayed minimum and maximum.
 * Delay padrão: 5 a 10 segundos.
 *
 * @param {Function} fn
 * @param {int} [options.min = 5000] Milliseconds
 * @param {int} [options.max = 10000] Milliseconds
 * @returns {Promise}
 */
async function delay(fn, options = {}) {
  return new Promise((resolve, reject) => {
    try {
      let {min = 5000, max = 10000} = options;
      let delay = Math.floor(Math.random() * (max - min + 1) + min);

      setTimeout(() => {
        fn();
        resolve();
      }, delay);

    } catch (error) {
      reject(error);
    }
  });
}