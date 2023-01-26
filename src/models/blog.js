import mongoose from "mongoose";

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

export default mongoose.model("blog", blogSchema);
