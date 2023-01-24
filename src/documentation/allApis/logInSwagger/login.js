module.exports = {
  post: {
    tags: ["Authentication"],
    summary: "Login a user",
    operationId: "login",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              username: {
                type: "string",
                description: "The username of the user",
                example: "johndoe",
              },
              password: {
                type: "string",
                description: "The password of the user",
                example: "password123",
              },
            },
            required: ["username", "password"],
          },
        },
      },
    },
    responses: {
      200: {
        description: "User logged in successfully",
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Welcome message for the user",
            },
            token: {
              type: "string",
              description: "JWT token for the user",
            },
          },
        },
      },
      401: {
        description: "Invalid username or password provided",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
