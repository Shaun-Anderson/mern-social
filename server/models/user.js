const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  screenName: String,
  googleId: String,
  twitterId: String,
  profileImageUrl: String
});

const User = mongoose.model("user", userSchema);

module.exports = User;