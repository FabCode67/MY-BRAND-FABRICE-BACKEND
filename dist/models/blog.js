"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const mongoose = require("mongoose");
const blogSchema = mongoose.Schema({
  blogTitle: "String",
  blogContent: "String",
  blogImage: "String",
  comments: [{
    username: {
      type: String
    },
    comment: {
      type: String
    }
  }]
});
var _default = mongoose.model("blog", blogSchema);
exports.default = _default;