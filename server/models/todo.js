const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: String,
  completed: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
}});

const todo = mongoose.model("Todo", todoSchema);

module.exports = todo;