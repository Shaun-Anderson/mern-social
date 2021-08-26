const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  image: String,
  imageUrl: String,
  likes: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  postedBy: { type: mongoose.Schema.ObjectId, ref: "User" },
});

const post = mongoose.model("Post", postSchema);

module.exports = post;
