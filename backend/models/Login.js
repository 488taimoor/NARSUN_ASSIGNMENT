const mongoose = require("mongoose");
const Schema = mongoose.Schema;
bcrypt = require('bcrypt')

const LoginAccount = new Schema({
  username: {
    type: String,
    default:'admin'
  },
  password: {
    type: String
  }


});
module.exports = mongoose.model("LoginAccount", LoginAccount);
