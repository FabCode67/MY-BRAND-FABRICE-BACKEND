import getUser from "./userSwagga/getUser";
import postUser from "./userSwagga/postUser";
import deleteUser from "./userSwagga/deleteUser";
import countUser from "./userSwagga/countUser";

import login from "./logInSwagger/login";
import profile from "./logInSwagger/profile";

import getContact from "./contactSwagger/getContact";
import postContact from "./contactSwagger/postContact";
import deleteContact from "./contactSwagger/deleteContact";
import countContact from "./contactSwagger/countContact";

import createBlog from "./blogSwagger/createBlog";
import getSingleBlog from "./blogSwagger/getSingleBlog";
import getAllBlogs from "./blogSwagger/getAllBllogs";
import updateBlog from "./blogSwagger/updateBlog";
import numberOfBlog from "./blogSwagger/numberOfBlog";
import deleteBlog from "./blogSwagger/deleteBlog";

import addComment from "./blogSwagger/CommentSwagger/addComment";
import deleteComment from "./blogSwagger/CommentSwagger/deleteComment";
import numberOfComment from "./blogSwagger/CommentSwagger/numberOfComment";

export default {
  paths: {

    "/api/login": {
      ...login,
    },

    "/api/profile": {
      ...profile,
    },



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
