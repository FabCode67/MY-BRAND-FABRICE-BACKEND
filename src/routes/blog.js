import express from "express";
import upload from "../middlewares/multer";
import { authenticat } from "../controllers/login";
import {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  addComment,
  countComments,
} from "../controllers/blog";

const router = express.Router();
/*= ====================================================ALL ENDPOINTS============================================== */
router.post("/blog", upload.single("blogImage"), authenticat, createBlog);
router.get("/blog", getAllBlogs);
router.get("/blog/:id", getSingleBlog);
router.patch("/blog/:id", upload.single("blogImage"), authenticat, updateBlog);
router.delete("/blog/:id", authenticat, deleteBlog);
router.post("/blog/:id/comment", authenticat, addComment, updateBlog);
router.get("/blog/:id/comment/count", countComments);
/*= ====================================================ALL ENDPOINTS============================================== */
export default router;
