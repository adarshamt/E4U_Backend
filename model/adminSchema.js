const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: "String",

  password: "String",
});

const admin = mongoose.model("admin", adminSchema);
module.exports = admin;
