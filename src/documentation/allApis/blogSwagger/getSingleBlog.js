module.exports = {
  get: {
    tags: ["Blog API"],
    summary: "Get a single blog by ID",
    operationId: "getSingleBlog",
    parameters: [
      {
        in: "path",
        name: "id",
        description: "ID of the blog to retrieve",
        required: true,
        type: "string",
      },
      {
        in: "header",
        name: "Authorization",
        description: "User's JWT token",
        required: true,
        type: "string",
      },
    ],
    responses: {
      200: {
        description: "Blog retrieved successfully",
        schema: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "ID of the blog post",
            },
            blogTitle: {
              type: "string",
              description: "Title of the blog post",
            },
            blogContent: {
              type: "string",
              description: "Content of the blog post",
            },
            blogImage: {
              type: "string",
              description: "Image URL of the blog post",
            },
          },
        },
      },
      400: {
        description: "Invalid input provided",
      },
      401: {
        description: "User is not authenticated",
      },
      404: {
        description: "Blog not found",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
