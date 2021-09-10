const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const TodoSchema = require('./todoSchema');

//User Model
const User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  todos: [TodoSchema],
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);
