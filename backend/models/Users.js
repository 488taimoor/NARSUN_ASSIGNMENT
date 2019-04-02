const mongoose = require("mongoose");
const Schema = mongoose.Schema;
bcrypt = require('bcrypt')

const Users = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String
  },
  deviceId:{ type: Schema.Types.ObjectId, ref: 'Devices' },


});
module.exports = mongoose.model("Users", Users);
