const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  screenName: String,
  googleId: String,
  twitterId: String,
  profileImageUrl: String,
  todos: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Todo"
  }],
  following: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  followers: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
});

const User = mongoose.model("User", userSchema);

module.exports = User;