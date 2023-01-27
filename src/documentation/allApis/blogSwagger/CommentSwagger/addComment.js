export default {
  post: {
    tags: ["Comment blog API"],
    summary: "Add a comment to a specific blog",
    operationId: "addComment",
    security: [{
      BearerAuth: []
     }],
    parameters: [
      {
        in: "path",
        name: "id",
        description: "ID of the blog to add a comment to",
        required: true,
        type: "string",
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              comment: {
                type: "string",
                description: "Comment to add to the blog",
              },
            },
            required: ["comment"],
          },
        },
      },
    },
    responses: {
      201: {
        description: "Comment added successfully",
      },
      400: {
        description: "Invalid input provided",
      },
      401: {
        description: "User is not authenticated",
      },
      404: {
        description: "Blog or user not found",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
