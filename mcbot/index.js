require("mineflayer");

const bot = mineflayer.createBot({
  host: "armamc.com", // minecraft server ip
  username: "Neoblade", // minecraft username
  password: "Dani313646" // minecraft password, comment out if you want to log into online-mode=false servers
  // port: 25565,                // only set if you need a port that isn"t 25565
  // version: false,             // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it"s set automatically
  // auth: "mojang"              // only set if you need microsoft auth, then set this to "microsoft"
});

/**
 * Whisper Event.
 */
bot.on("whisper", (username, message) => {
  var answers = ["Opa", "fala", "oi?", "oi", "opa", "e ae"];
  var answer = answers[Math.floor(Math.random() * answers.length)];

  let delayed = delay(function() {
    bot.whisper(username, answer);
  });

  delay(function () {
    bot.quit(username + " sent: " + message);
  }, {
    amount: delayed + 3000
  });
})

/**
 * Executes a function with delayed amount or minimum.
 *
 * @param {Function} fn
 * @param {int} [options.amount] Milliseconds
 * @param {int} [options.minimum = 5000] Milliseconds
 * @returns {int} Delayed amount
 */
function delay(fn, options = {}) {
  let {amount, minimum = 5000} = options;
  let delay = amount || ((Math.random() * 10000) / 2) + minimum;
  setTimeout(() => fn(), delay);
  return delay;
}