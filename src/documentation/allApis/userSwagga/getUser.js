export default {

  get: {
    tags: ["User API"],
    description: "Get all users", 
    operationId: "getUsers", 
    parameters: [], 
   
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
