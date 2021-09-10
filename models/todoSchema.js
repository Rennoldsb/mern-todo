const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  task: String,
  refID: Number,
});

module.exports = TodoSchema;
