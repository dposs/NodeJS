var mongoose = require("mongoose");

var AuthorizationCodeSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true
  },
  redirectURI: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  clientId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("AuthorizationCode", AuthorizationCodeSchema);