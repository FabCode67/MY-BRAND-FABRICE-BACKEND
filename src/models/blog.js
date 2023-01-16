const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    blogTitle:"String",
    blogContent:"String",
    blogImage:"String"
})

module.exports = mongoose.model("blog", blogSchema)