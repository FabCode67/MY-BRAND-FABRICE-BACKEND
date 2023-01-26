"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateBlog = exports.getSingleBlog = exports.getAllBlogs = exports.deleteComment = exports.deleteBlog = exports.createBlog = exports.countComments = exports.countBlogs = exports.addComment = void 0;
var _cloudinary = _interopRequireDefault(require("cloudinary"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _blog = _interopRequireDefault(require("../models/blog"));
var _user = _interopRequireDefault(require("../models/user"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
_dotenv.default.config();
const secretKey = process.env.SECRETKEY;
/*= ====================================================CREATE BLOG========================================= */

const createBlog = async (req, res) => {
  // Check if blog title and content already exist
  const existingBlog = await _blog.default.findOne({
    blogTitle: req.body.blogTitle,
    blogContent: req.body.blogContent
  });
  if (existingBlog) {
    return res.status(400).json({
      status: "fail",
      message: "Blog title and content already exist"
    });
  }

  // Upload image
  const result = await _cloudinary.default.uploader.upload(req.file.path);

  // Create new blog
  const blog = new _blog.default({
    blogTitle: req.body.blogTitle,
    blogContent: req.body.blogContent,
    blogImage: result.secure_url
  });

  // Save blog to database
  blog.save().then(result => {
    res.status(201).json({
      status: "success",
      message: "Blog created successfully",
      data: {
        _id: result._id,
        blogTitle: result.blogTitle,
        blogContent: result.blogContent,
        blogImage: result.blogImage
      }
    });
  }).catch(err => {
    res.status(500).json({
      status: "fail",
      error: err
    });
  });
};

/*= ====================================================CREATE BLOG========================================= */

/*= ====================================================GET ALL BLOG========================================= */
exports.createBlog = createBlog;
const getAllBlogs = async (req, res) => {
  try {
    const query = await _blog.default.find();
    res.send({
      status: "success",
      data: query
    });
  } catch (err) {
    res.status(404);
    res.send({
      status: "fail",
      message: "Blogs not found"
    });
  }
};
/*= ====================================================GET ALL BLOG========================================= */

/*= ====================================================GET SINGLE BLOG========================================= */
exports.getAllBlogs = getAllBlogs;
const getSingleBlog = (req, res) => {
  const {
    id
  } = req.params;
  _blog.default.findById(id).exec().then(blog => {
    if (!blog) {
      return res.status(404).json({
        status: "fail",
        message: "Blog not found"
      });
    }
    res.status(200).json({
      status: "success",
      blog
    });
  }).catch(err => {
    res.status(500).json({
      status: "fail",
      error: err
    });
    console.log(err);
  });
};
/*= ====================================================GET SINGLE BLOG========================================= */

/*= ====================================================UPDATE SINGLE BLOG========================================= */
exports.getSingleBlog = getSingleBlog;
const updateBlog = async (req, res) => {
  // Check if blog title and content already exist
  const existingBlog = await _blog.default.findOne({
    blogTitle: req.body.blogTitle,
    blogContent: req.body.blogContent
  });
  if (existingBlog) {
    return res.status(400).json({
      status: "fail",
      message: "Blog title and content already exist"
    });
  }
  const {
    id
  } = req.params;
  let updateOps = {};
  if (req.file) {
    const result = await _cloudinary.default.uploader.upload(req.file.path);
    updateOps = _objectSpread(_objectSpread({}, updateOps), {}, {
      blogImage: result.secure_url
    });
  }
  if (req.body.blogTitle) {
    updateOps = _objectSpread(_objectSpread({}, updateOps), {}, {
      blogTitle: req.body.blogTitle
    });
  }
  if (req.body.blogContent) {
    updateOps = _objectSpread(_objectSpread({}, updateOps), {}, {
      blogContent: req.body.blogContent
    });
  }
  _blog.default.update({
    _id: id
  }, {
    $set: updateOps
  }).exec().then(result => {
    res.status(200).json({
      status: "success",
      message: "Blog updated successfully"
    });
  }).catch(err => {
    res.status(500).json({
      status: "fail",
      error: err
    });
  });
};

/*= ====================================================UPDATE SINGLE BLOG========================================= */

/*= ====================================================DELETE SINGLE BLOG========================================= */
exports.updateBlog = updateBlog;
const deleteBlog = async (req, res) => {
  try {
    const blogToDelete = await _blog.default.findOne({
      _id: req.params.id
    });
    if (!blogToDelete) {
      res.status(404).send({
        status: "fail",
        message: "blog not found"
      });
      return;
    }
    await _blog.default.deleteOne({
      _id: req.params.id
    });
    res.status(200).json({
      status: "success",
      message: "blog deleted successfully"
    });
  } catch (err) {
    res.status(404).send({
      status: "fail",
      message: "Blog not found"
    });
  }
};
/*= ====================================================DELETE SINGLE BLOG========================================= */

/*= ====================================================ADD COMENT ON SINGLE BLOG========================================= */
exports.deleteBlog = deleteBlog;
const addComment = async (req, res) => {
  try {
    // Find the specific blog that the user is trying to add a comment to
    const blog = await _blog.default.findById(req.params.id);
    console.log(blog);
    if (!blog) {
      return res.status(404).send({
        status: "fail",
        message: "Blog not found"
      });
    }
    const token = req.headers.authorization;
    const decoded = _jsonwebtoken.default.verify(token, secretKey);
    if (!decoded) {
      return res.status(401).send({
        status: "fail",
        message: "Unauthorized"
      });
    }
    const user = await _user.default.findOne({
      username: decoded.username
    });
    if (!user) {
      return res.status(404).send({
        status: "fail",
        message: "User not found"
      });
    }
    const comment = {
      username: user.username,
      comment: req.body.comment
    };
    await _blog.default.findByIdAndUpdate(req.params.id, {
      $push: {
        comments: comment
      }
    });
    res.status(201).send({
      status: "success",
      message: "Comment added successfully"
    });
  } catch (err) {
    res.status(500).send({
      status: "success",
      message: "Error adding comment"
    });
    console.log(err);
  }
};

/*= ====================================================ADD COMENT ON SINGLE BLOG========================================= */

/*= ====================================================DELETE COMMENT ON SINGLE BLOG========================================= */
exports.addComment = addComment;
const deleteComment = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decoded = _jsonwebtoken.default.verify(token, secretKey);
    if (!decoded) {
      return res.status(401).send({
        status: "fail",
        message: "Unauthorized"
      });
    }
    const user = await _user.default.findOne({
      username: decoded.username
    });
    if (!user) {
      return res.status(404).send({
        status: "fail",
        message: "User not found"
      });
    }

    // const blog = await Blog.findById(req.params.id);
    const blog = await _blog.default.findOne({
      _id: req.params.id
    });
    console.log(blog);
    if (!blog) {
      return res.status(404).send({
        status: "fail",
        message: "Blog not found"
      });
    }
    const comment = blog.comments.find(c => c._id == req.params.commentId);
    if (!comment) {
      return res.status(404).send({
        status: "fail",
        message: "Comment not found"
      });
    }

    // if (comment.user.toString() !== user._id.toString() && !user.isAdmin) {
    //     return res.status(401).send({ error: "Unauthorized" });
    // }

    await _blog.default.findByIdAndUpdate(req.params.id, {
      $pull: {
        comments: {
          _id: req.params.commentId
        }
      }
    });
    res.status(200).send({
      status: "success",
      message: "Comment deleted successfully"
    });
  } catch (err) {
    res.status(500).send({
      status: "fail",
      message: "Error deleting comment"
    });
    console.log(err);
  }
};

/*= ====================================================DELETE COMMENT ON SINGLE BLOG========================================= */

/*= ====================================================COUNT BLOG========================================= */
exports.deleteComment = deleteComment;
const countBlogs = async (req, res) => {
  try {
    const blogCount = await _blog.default.countDocuments();
    res.status(200).send({
      status: "success",
      message: `There are ${blogCount} blogs in the collection.`
    });
  } catch (err) {
    res.status(500).send({
      status: "fail",
      message: "Error counting blogs"
    });
  }
};
/*= ====================================================COUNT BLOG========================================= */

/*= ====================================================COUNT COMMENT BLOG========================================= */
exports.countBlogs = countBlogs;
const countComments = async (req, res) => {
  try {
    const blog = await _blog.default.findById(req.params.id);
    if (!blog) {
      return res.status(404).send({
        status: "fail",
        message: "Blog not found"
      });
    }
    const commentCount = blog.comments.length;
    res.status(200).send({
      status: "success",
      message: `Blog has ${commentCount} comments.`
    });
  } catch (err) {
    res.status(500).send({
      status: "fail",
      message: "Error counting comments"
    });
  }
};

/*= ====================================================COUNT COMMENT BLOG========================================= */
exports.countComments = countComments;