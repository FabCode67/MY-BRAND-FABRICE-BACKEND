const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: "String",
  username: "String",
  gender: "String",
  password: "String",
  confirmPassword: "String",
});

export default mongoose.model("user", userSchema);
