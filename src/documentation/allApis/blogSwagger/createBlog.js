export default {
  post: {
    tags: ["Blog API"],
    description: "Create a new blog post",
    operationId: "createBlog",
    parameters: [
      {
        in: "header",
        name: "Authorization",
        description: "User's JWT token",
        required: true,
        type: "string",
      },
    ],

    requestBody: {
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            properties: {
              blogTitle: {
                type: "string",
                description: "Title of the blog post",
                example: "How to Build a RESTful API",
              },
              blogContent: {
                type: "string",
                description: "Content of the blog post",
                example: "Building a RESTful API is a great way to...",
              },
              blogImage: {
                type: "file",
                description: "Image for the blog post",
              },
            },
            required: ["blogTitle", "blogContent", "blogImage"],
          },
        },
      },
    },
    responses: {
      201: {
        description: "Blog post created successfully",
        schema: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "ID of the created blog post",
            },
            blogTitle: {
              type: "string",
              description: "Title of the created blog post",
            },
            blogContent: {
              type: "string",
              description: "Content of the created blog post",
            },
            blogImage: {
              type: "string",
              description: "Image URL of the created blog post",
            },
          },
        },
      },
      400: {
        description: "Invalid input provided",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
