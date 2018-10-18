const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const userScheme = new Schema({
  firstName: String,
  lastName: String,
  login: String,
  password: String,
  Age: { type: String, min: 5, max: 100 }, 
  Role: { type: String, default:"User"}, 
  Avatar: String
})
userScheme.plugin(mongoosePaginate);
const User = mongoose.model("User", userScheme)

module.exports = User