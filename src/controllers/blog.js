import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Blog from "../models/blog";
import User from "../models/user";
import cloudinary from "../middlewares/cloudinary";

dotenv.config();
const secretKey = process.env.SECRETKEY;
/*= ====================================================CREATE BLOG========================================= */


// const uploadToCloudinary = (filePath) => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(filePath, function(error, result) {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(result.secure_url);
//       }
//     });
//   });
// };


// export const createBlog = async (req, res) => {
//   // Check if blog title and content already exist
//   const existingBlog = await Blog.findOne({
//     blogTitle: req.body.blogTitle,
//     blogContent: req.body.blogContent,
//   });

//   if (existingBlog) {
//     return res.status(409).json({
//       status: "fail",
//       message: "Blog title and content already exist",
//     });
//   }

//   try {
//     // Upload image
//     const imageUrl = await uploadToCloudinary(req.file.path);
//     // Create new blog
//     const blog = new Blog({
//       blogTitle: req.body.blogTitle,
//       blogContent: req.body.blogContent,
//       blogImage: imageUrl,
//     });

//     // Save blog to database
//     const savedBlog = await blog.save();

//     res.status(201).json({
//       status: "success",
//       message: "Blog created successfully",
//       data: {
//         _id: savedBlog._id,
//         blogTitle: savedBlog.blogTitle,
//         blogContent: savedBlog.blogContent,
//         blogImage: savedBlog.blogImage,
//       },
//     });

//   } catch (error) {
//     res.status(500).json({
//       status: "fail",
//       message: "An error occurred while uploading the image to Cloudinary",
//     });
//     console.log(error);
//     console.log(imageUrl);

//   }
// };


export const createBlog =   async (req, res)=> {
    // Check if blog title and content already exist
  const existingBlog = await Blog.findOne({
    blogTitle: req.body.blogTitle,
    blogContent: req.body.blogContent,
  });

  if (existingBlog) {
    return res.status(409).json({
      status: "fail",
      message: "Blog title and content already exist",
    });
  }
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);
      // const article = await Article.create(req.body);
  const blog = new Blog({
    blogTitle: req.body.blogTitle,
    blogContent: req.body.blogContent,
    blogImage: result.secure_url,
  });

     blog.save().then((result) => {
    res.status(201).json({
      status: "success",
      message: "Blog created successfully",
      data: {
        _id: result._id,
        blogTitle: result.blogTitle,
        blogContent: result.blogContent,
        blogImage: result.blogImage,
      },
    });
  });
};





// export const createBlog = async (req, res) => {
//   // Check if blog title and content already exist
//   const existingBlog = await Blog.findOne({
//     blogTitle: req.body.blogTitle,
//     blogContent: req.body.blogContent,
//   });

//   if (existingBlog) {
//     return res.status(409).json({
//       status: "fail",
//       message: "Blog title and content already exist",
//     });
//   }

//   // Upload image
//   const result = await cloudinary.uploader.upload(req.file.path);

//   // Create new blog
//   const blog = new Blog({
//     blogTitle: req.body.blogTitle,
//     blogContent: req.body.blogContent,
//     blogImage: result.secure_url,
//   });

//   // Save blog to database
//   blog.save().then((result) => {
//     res.status(201).json({
//       status: "success",
//       message: "Blog created successfully",
//       data: {
//         _id: result._id,
//         blogTitle: result.blogTitle,
//         blogContent: result.blogContent,
//         blogImage: result.blogImage,
//       },
//     });
//   });
// };

/*= ====================================================CREATE BLOG========================================= */

/*= ====================================================GET ALL BLOG========================================= */

export const getAllBlogs = async (req, res) => {
  const query = await Blog.find();
  res.send({ status: "success", data: query });
};
/*= ====================================================GET ALL BLOG========================================= */

/*= ====================================================GET SINGLE BLOG========================================= */

export const getSingleBlog = (req, res) => {
  const { id } = req.params;
  Blog.findById(id)
    .exec()
    .then((blog) => {
      if (!blog) {
        return res.status(404).json({
          status: "fail",
          message: "Blog not found",
        });
      }
      res.status(200).json({
        status: "success",
        data: blog,
      });
    });
};
/*= ====================================================GET SINGLE BLOG========================================= */

/*= ====================================================UPDATE SINGLE BLOG========================================= */

export const updateBlog = async (req, res) => {
  // Check if blog title and content already exist
  const existingBlog = await Blog.findOne({
    blogTitle: req.body.blogTitle,
    blogContent: req.body.blogContent,
  });

  if (existingBlog) {
    return res.status(409).send({
      status: "fail",
      message: "Blog title and content already exist",
    });
  }

  const { id } = req.params;
  let updateOps = {};
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path);
    updateOps = {
      ...updateOps,
      blogImage: result.secure_url,
    };
  }
  if (req.body.blogTitle) {
    updateOps = {
      ...updateOps,
      blogTitle: req.body.blogTitle,
    };
  }
  if (req.body.blogContent) {
    updateOps = {
      ...updateOps,
      blogContent: req.body.blogContent,
    };
  }
  Blog.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        status: "success",
        message: "Blog updated successfully",
      });
    });
};

/*= =========================================UPDATE SINGLE BLOG========================================= */

/*= =========================================DELETE SINGLE BLOG========================================= */

export const deleteBlog = async (req, res) => {
  try {
    const blogToDelete = await Blog.findOne({ _id: req.params.id });
    if (!blogToDelete) {
      res.status(404).send({ status: "fail", message: "blog not found" });
      return;
    }
    await Blog.deleteOne({ _id: req.params.id });
    res
      .status(204)
      .send({ status: "success", message: "blog deleted successfully" });
  } catch (err) {
    res.status(404).send({ status: "fail", message: "endpoint not found" });
  }
};
/*= ====================================================DELETE SINGLE BLOG========================================= */

/*= ====================================================ADD COMENT ON SINGLE BLOG========================================= */

export const addComment = async (req, res) => {
  // Find the specific blog that the user is trying to add a comment to
  const blog = await Blog.findById(req.params.id);
  console.log(blog);
  if (!blog) {
    return res
      .status(404)
      .send({ status: "fail", message: "Blog not to add coment found" });
  }
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, secretKey);

  // if (!decoded) {
  //   return res.status(404).send({ status: "fail", message: "user not authorized" });
  // }
  const user = await User.findOne({ username: decoded.username });
  // if (!user) {
  //   return res
  //     .status(404)
  //     .send({ status: "fail", message: "User not found" });
  // }
  const comment = {
    username: user.username,
    comment: req.body.comment,
  };

  await Blog.findByIdAndUpdate(req.params.id, {
    $push: { comments: comment },
  });
  res
    .status(201)
    .send({ status: "success", message: "Comment added successfully" });

  // catch (err) {
  //   res
  //     .status(500)
  //     .send({ status: "fail", message: "Error adding comment" });
  //   console.log(err);
  // }
};

/*= ====================================================ADD COMENT ON SINGLE BLOG========================================= */

/*= ====================================================DELETE COMMENT ON SINGLE BLOG========================================= */

// export const deleteComment = async (req, res) => {
//   try {
//     const token = req.headers.authorization;
//     const decoded = jwt.verify(token, secretKey);

//     if (!decoded) {
//       return res.status(401).send({ status: "fail", message: "Unauthorized" });
//     }
//     const user = await User.findOne({ username: decoded.username });
//     if (!user) {
//       return res
//         .status(404)
//         .send({ status: "fail", message: "User not found" });
//     }

//     // const blog = await Blog.findById(req.params.id);
//     const blog = await Blog.findOne({ _id: req.params.id });

//     console.log(blog);
//     if (!blog) {
//       return res
//         .status(404)
//         .send({ status: "fail", message: "Blog not found" });
//     }

//     const comment = blog.comments.find((c) => c._id == req.params.commentId);
//     if (!comment) {
//       return res
//         .status(404)
//         .send({ status: "fail", message: "Comment not found" });
//     }

//     // if (comment.user.toString() !== user._id.toString() && !user.isAdmin) {
//     //     return res.status(401).send({ error: "Unauthorized" });
//     // }

//     await Blog.findByIdAndUpdate(req.params.id, {
//       $pull: { comments: { _id: req.params.commentId } },
//     });
//     res
//       .status(201)
//       .send({ status: "success", message: "Comment deleted successfully" });
//   } catch (err) {
//     res.status(500).send({ status: "fail", message: "Error deleting comment" });
//     console.log(err);
//   }
// };

/*= ====================================================DELETE COMMENT ON SINGLE BLOG========================================= */

/*= ====================================================COUNT BLOG========================================= */

/*= ====================================================COUNT BLOG========================================= */

/*= ====================================================COUNT COMMENT BLOG========================================= */
export const countComments = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).send({ status: "fail", message: "Blog not found" });
  }

  const commentCount = blog.comments.length;

  res.status(200).send({
    status: "success",
    message: `Blog has ${commentCount} comments.`,
  });
};

/*= ====================================================COUNT COMMENT BLOG========================================= */
