export default {
  delete: {
    tags: ["Blog API"],
    summary: "Delete a blog post by ID",
    operationId: "deleteBlog",
    security: [{
      BearerAuth: []
  }],
    parameters: [
      {
        in: "path",
        name: "id",
        description: "ID of the blog post to delete",
        required: true,
        type: "string",
      },
    ],
    responses: {
      200: {
        description: "Blog post deleted successfully",
      },
      400: {
        description: "Invalid input provided",
      },
      401: {
        description: "User is not authenticated",
      },
      404: {
        description: "Blog post not found",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
