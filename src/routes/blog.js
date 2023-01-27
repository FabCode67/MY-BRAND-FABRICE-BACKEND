import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

/*= ====================================================CLOUDINARY CONFIG============================================== */

require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
/*= ====================================================CLOUDINARY CONFIG============================================== */

/*= ====================================================UPLOAD FOLDER WITH MULTER============================================== */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
import  {authenticat}  from "../controllers/login";
import {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  addComment,
  deleteComment,
  countComments,
  countBlogs,
}  from "../controllers/blog";
/*= ====================================================UPLOAD FOLDER WITH MULTER============================================== */

/*= ====================================================ALL ENDPOINTS============================================== */

router.post("/blog", upload.single("blogImage"), authenticat, createBlog);
router.get("/blog", getAllBlogs);
router.get("/blog/:id", authenticat, getSingleBlog);
router.patch("/blog/:id", upload.single("blogImage"), authenticat, updateBlog);
router.delete("/blog/:id", authenticat, deleteBlog);
router.delete(
  "/blogs/:id/comments/:id",
  authenticat,
  deleteComment,
  updateBlog,
);
router.post("/blog/:id/comment", authenticat, addComment, updateBlog);
router.get("/blog/:id/comment/count", countComments);
router.get("/blog/count", countBlogs);
/*= ====================================================ALL ENDPOINTS============================================== */

export default router;
