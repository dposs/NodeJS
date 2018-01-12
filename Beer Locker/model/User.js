var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre("save", function(done) {
  var user = this;

  if (!user.isModified("password")) return done();

  bcrypt.genSalt(5, function(error, salt) {
    if (error) return done(error);

    bcrypt.hash(user.password, salt, null, function(error, hash) {
      if (error) return done(error);

      user.password = hash;
      done();
    });
  });
});

UserSchema.methods.verifyPassword = function(password, done) {
  bcrypt.compare(password, this.password, function(error, isMatch) {
    if (error) return done(error);
    done(null, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);