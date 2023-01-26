export default {
  get: {
    tags: ["Blog API"],
    summary: "Get the count of all blogs",
    operationId: "countBlogs",
    responses: {
      200: {
        description: "The count of all blogs",
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "The message containing the count of all blogs",
            },
          },
        },
      },
      500: {
        description: "Server error",
      },
    },
  },
};
