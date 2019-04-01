const mongoose = require("mongoose");
const Schema = mongoose.Schema;
bcrypt = require('bcrypt')

const Devices = new Schema({
  deviceName: {
    type: String,
  },
  imageUrl: {
    type: String
  },
  warranty: {
    type: Number
  },
  expiry: {
    type: String
  },
  cost: {
    type: Number
  }


});
module.exports = mongoose.model("Devices", Devices);
