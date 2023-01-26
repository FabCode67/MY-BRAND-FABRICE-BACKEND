export default {
  // operation's method.
  delete: {
    tags: ["User API"], // operation's tag
    description: "Deleting a user", // short desc
    operationId: "deleteUser", // unique operation id
    parameters: [
      // expected parameters
      {
        name: "id", // name of param
        in: "path", // location of param
        schema: {
          type: "string",
        },
        required: true, // mandatory
        description: "Deleting a user by id", // param desc
      },
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: "User deleted successfully", // response desc
      },
      // response code
      404: {
        description: "User not found", // response desc
      },
      // response code
      500: {
        description: "Server error", // response desc
      },
    },
  },
};
