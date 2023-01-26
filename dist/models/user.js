"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  email: "String",
  username: "String",
  gender: "String",
  password: "String",
  confirmPassword: "String"
});
var _default = mongoose.model("user", userSchema);
exports.default = _default;