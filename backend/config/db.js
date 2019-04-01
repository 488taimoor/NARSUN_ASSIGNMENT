
const mongoose = require("mongoose");

const connectionstr =  "mongodb://localhost:27017/NarsunDB";

const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10
};

mongoose.connect(connectionstr, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

