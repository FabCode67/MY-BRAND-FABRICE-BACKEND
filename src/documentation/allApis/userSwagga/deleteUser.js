export default {
  delete: {
    tags: ["User API"],
    description: "Deleting a user",
    operationId: "deleteUser",
    security: [
      {
        BearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "id",
        in: "path",
        schema: {
          type: "string",
        },
        required: true,
        description: "Deleting a user by id",
      },
    ],

    responses: {
      200: {
        description: "User deleted successfully",
      },

      404: {
        description: "User not found",
      },

      500: {
        description: "Server error",
      },
    },
  },
};
