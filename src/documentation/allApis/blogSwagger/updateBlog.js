export default {
  patch: {
    tags: ["Blog API"],
    summary: "Update a blog by id",
    operationId: "updateBlog",
    security: [
      {
        BearerAuth: [],
      },
    ],
    parameters: [
      {
        in: "path",
        name: "id",
        description: "ID of the blog to update",
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
            required: ["blogTitle", "blogContent"],
          },
        },
      },
    },
    responses: {
      200: {
        description: "Blog updated successfully",
      },
      400: {
        description: "Invalid input provided",
      },
      401: {
        description: "User is not authenticated",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
