let fs = require("fs").promises;
let readline = require("readline");

let {google} = require("googleapis");

let OAuth2 = google.auth.OAuth2;

/**
 * Service de comunicação com Google.
 *
 * @class GoogleService
 */
class GoogleService {

  /**
   * Cria uma instancia de GoogleService.
   *
   * @memberof GoogleService
   */
  constructor() {
    this.SCOPES = ["https://www.googleapis.com/auth/youtube.readonly"];
    this.TOKEN_DIR = "credentials/google/";
    this.TOKEN_PATH = this.TOKEN_DIR + "credentials.json";
  }

  /**
   * Realiza e retorna a autorização oAuth2.
   *
   * @async
   * @returns {Promise<google.auth.OAuth2>} The OAuth2 client.
   * @memberof GoogleService
   */
  async getAuthorization() {
    let content = await fs.readFile("credentials/google/client_secret.json").catch(console.log);
    
    if (content) {
      return this.authorize(JSON.parse(content));
    }
  }

  /**
   * Create an OAuth2 client with the given credentials, and then execute the given callback function.
   *
   * @async
   * @param {Object} credentials The authorization client credentials.
   * @returns {Promise<google.auth.OAuth2>} The OAuth2 client.
   * @memberof GoogleService
   */
  async authorize(credentials) {
    let clientSecret = credentials.installed.client_secret;
    let clientId = credentials.installed.client_id;
    let redirectUrl = credentials.installed.redirect_uris[0];

    let oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

    return fs.readFile(this.TOKEN_PATH)
      .then(token => Object.assign(oauth2Client, {"credentials": JSON.parse(token)}))
      .catch(() => this.getNewToken(oauth2Client));
  }

  /**
   * Get and store new token after prompting for user authorization, and then execute the given callback with the authorized OAuth2 client.
   *
   * @async
   * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback to call with the authorized client.
   * @returns {Promise<google.auth.OAuth2>} The OAuth2 client.
   * @memberof GoogleService
   */
  async getNewToken(oauth2Client) {
    let authUrl = oauth2Client.generateAuthUrl({access_type: "offline", scope: this.SCOPES});
    let rl = readline.createInterface({input: process.stdin, output: process.stdout});

    console.log("Authorize this app by visiting this url: ", authUrl);

    return new Promise(resolve => {
      rl.question("Enter the code from that page here: ", code => {
        rl.close();
  
        oauth2Client.getToken(code, (error, token) => {
          if (error) {
            console.log("Error while trying to retrieve access token", error);
            return;
          }
  
          this.storeToken(token);
  
          resolve(Object.assign(oauth2Client, {"credentials": token}));
        });
      });
    });
  }

  /**
   * Store token to disk be used in later program executions.
   *
   * @async
   * @param {Object} token The token to store to disk.
   * @returns {Promise}
   */
  async storeToken(token) {
    await fs.mkdir(this.TOKEN_DIR).catch(error => {
      if (error.code != "EEXIST") throw error;
    });

    return fs.writeFile(this.TOKEN_PATH, JSON.stringify(token)).then(() => {
      console.log("Token stored to " + this.TOKEN_PATH);
    });
  }
}

module.exports = GoogleService;