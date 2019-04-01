const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccessTokenSchema = new Schema({
  token: {
    type: String,
    unique: true
  },
  userAccount: { type: Schema.Types.ObjectId, ref: 'LoginAccount' },
});

module.exports = mongoose.model("UserAccessToken", AccessTokenSchema);
