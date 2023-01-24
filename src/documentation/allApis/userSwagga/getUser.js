module.exports = {
  // method of operation
  get: {
    tags: ["User API"], // operation's tag.
    description: "Get all users", // operation's desc.
    operationId: "getUsers", // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      200: {
        description: "OK",
        schema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              email: {
                type: "string",
              },
              username: {
                type: "string",
              },
              gender: {
                type: "string",
              },
              password: {
                type: "string",
              },
              confirmPassword: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};
