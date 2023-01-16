import express from 'express';
const router = express.Router();
import multer from 'multer'; // for handling image upload
import path from'path';

require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'))
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});
const upload = multer({ storage });

const { createBlog, getAllBlogs, getSingleBlog, updateBlog, deleteBlog } = require('./../controllers/blog');
router.post('/blog', upload.single('blogImage'), createBlog);
router.get("/blog", getAllBlogs);
router.get('/blog/:id', getSingleBlog);
router.patch('/blog/:id', upload.single('blogImage'), updateBlog);
router.delete('/blog/:id', deleteBlog);

module.exports = router;
