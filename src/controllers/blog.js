import cloudinary from 'cloudinary';
import Blog from'./../models/blog'; // import the blog model

export const createBlog = async (req, res) => {
    const result = await cloudinary.uploader.upload(req.file.path);
    const blog = new Blog({
        blogTitle: req.body.blogTitle,
        blogContent: req.body.blogContent,
        blogImage: result.secure_url
    });
    blog.save()
        .then(result => {
            res.status(201).json({
                message: 'Blog created successfully',
                createdBlog: {
                    _id: result._id,
                    blogTitle: result.blogTitle,
                    blogContent: result.blogContent,
                    blogImage: result.blogImage
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

export const getAllBlogs = async (req, res) => {
    try {
        const query = await Blog.find();
        res.send(query);
    } catch (err) {
        res.status(404);
        res.send({ error: "Blogs not found" });
    }
};

export const getSingleBlog = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .exec()
        .then(blog => {
            if (!blog) {
                return res.status(404).json({
                    message: "Blog not found"
                });
            }
            res.status(200).json({
                blog: blog
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

export const updateBlog = async (req, res) => {
    const id = req.params.id;
    let updateOps = {};
    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        updateOps = {
            ...updateOps,
            blogImage: result.secure_url
        }
    }
    if (req.body.blogTitle) {
        updateOps = {
            ...updateOps,
            blogTitle: req.body.blogTitle
        }
    }
    if (req.body.blogContent) {
        updateOps = {
            ...updateOps,
            blogContent: req.body.blogContent
        }
    }
    Blog.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Blog updated successfully'
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
              });
            });
      };
       


    export const deleteBlog = async (req, res) => {
        try {
            await Blog.deleteOne({ _id: req.params.id });
            res.status(204).send();
        } catch (err) {
            res.status(404).send({ error: "Blog not found" });
        }
    };
    