"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();

/*= ====================================================CLOUDINARY CONFIG============================================== */

require("dotenv").config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
/*= ====================================================CLOUDINARY CONFIG============================================== */

/*= ====================================================UPLOAD FOLDER WITH MULTER============================================== */

const storage = _multer.default.diskStorage({
  destination: (req, file, cb) => {
    cb(null, _path.default.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = (0, _multer.default)({
  storage
});
const {
  authenticat
} = require("../controllers/login");
const {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  addComment,
  deleteComment,
  countComments,
  countBlogs
} = require("../controllers/blog");
/*= ====================================================UPLOAD FOLDER WITH MULTER============================================== */

/*= ====================================================ALL ENDPOINTS============================================== */

router.post("/blog", upload.single("blogImage"), authenticat, createBlog);
router.get("/blog", getAllBlogs);
router.get("/blog/:id", authenticat, getSingleBlog);
router.patch("/blog/:id", upload.single("blogImage"), authenticat, updateBlog);
router.delete("/blog/:id", authenticat, deleteBlog);
router.delete("/blogs/:id/comments/:id", authenticat, deleteComment, updateBlog);
router.post("/blog/:id/comment", authenticat, addComment, updateBlog);
router.get("/blogs/:id/comments/count", countComments);
router.get("/blogs/count", countBlogs);
/*= ====================================================ALL ENDPOINTS============================================== */
var _default = router;
exports.default = _default;