const getUser = require("./userSwagga/getUser");
const postUser = require("./userSwagga/postUser");
const deleteUser = require("./userSwagga/deleteUser");
const countUser = require("./userSwagga/countUser");

const login = require("./logInSwagger/login");
const profile = require("./logInSwagger/profile");

const getContact = require("./contactSwagger/getContact");
const postContact = require("./contactSwagger/postContact");
const deleteContact = require("./contactSwagger/deleteContact");
const countContact = require("./contactSwagger/countContact");

const createBlog = require("./blogSwagger/createBlog");
const getSingleBlog = require("./blogSwagger/getSingleBlog");
const getAllBlogs = require("./blogSwagger/getAllBllogs");
const updateBlog = require("./blogSwagger/updateBlog");
const numberOfBlog = require("./blogSwagger/numberOfBlog");
const deleteBlog = require("./blogSwagger/deleteBlog");

const addComment = require("./blogSwagger/CommentSwagger/addComment");
const deleteComment = require("./blogSwagger/CommentSwagger/deleteComment");
const numberOfComment = require("./blogSwagger/CommentSwagger/numberOfComment");

module.exports = {
  paths: {
    "/api/user": {
      ...postUser,
      ...getUser,
    },
    "/api/contact/count": {
      ...countUser,
    },

    "/api/user/{id}": {
      ...deleteUser,
    },

    "/api/login": {
      ...login,
    },

    "/api/profile": {
      ...profile,
    },

    "/api/contact/": {
      ...postContact,
      ...getContact,
    },
    "/api/contact/count": {
      ...countContact,
    },

    "/api/contact/{id}": {
      ...deleteContact,
    },

    "/api/blog/": {
      ...createBlog,
      ...getAllBlogs,
    },
    "/api/blog/count": {
      ...numberOfBlog,
    },

    "/api/blog/{id}": {
      ...getSingleBlog,
      ...updateBlog,
      ...deleteBlog,
    },

    "/api/blog/{id}/comment": {
      ...addComment,
    },
    "/api/blog/{id}/comment/count": {
      ...numberOfComment,
    },
    "/api/blog/{blogId}/comment/{commentId}": {
      ...deleteComment,
    },
  },
};
