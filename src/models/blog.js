const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  blogTitle: "String",
  blogContent: "String",
  blogImage: "String",
  comments: [
    {
      username: {
        type: String,
      },
      comment: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("blog", blogSchema);
