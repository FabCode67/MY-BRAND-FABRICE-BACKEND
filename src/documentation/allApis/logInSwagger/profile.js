export default {
  get: {
    tags: ["Authentication"],
    description: "Get the profile of the logged-in user",
    operationId: "getProfile",
    security: [
      {
        BearerAuth: [],
      },
    ],
    responses: {
      200: {
        description: "Profile retrieved successfully",
        schema: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "ID of the user",
            },
            username: {
              type: "string",
              description: "Username of the user",
            },
            email: {
              type: "string",
              description: "Email of the user",
            },
            isAdmin: {
              type: "boolean",
              description: "Indicates if the user is an administrator",
            },
          },
        },
      },
      401: {
        description: "Unauthorized",
      },
    },
  },
};
