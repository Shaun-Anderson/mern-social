const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  screenName: String,
  googleId: String,
  twitterId: String,
  profileImageUrl: String,
  private: Boolean,
  following: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  followers: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
});

const User = mongoose.model("User", userSchema);

module.exports = User;