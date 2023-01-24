module.exports = {
  get: {
    summary: "Count the number of users",
    tags: ["User API"],
    responses: {
      200: {
        description: "OK",
        schema: {
          type: "object",
          example: {
            message: "There are 10 users in the collection.",
          },
        },
      },
      500: {
        description: "Error counting users",
      },
    },
  },
};
