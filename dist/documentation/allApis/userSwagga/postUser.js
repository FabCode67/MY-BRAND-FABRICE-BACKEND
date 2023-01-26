"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  post: {
    tags: ["User API"],
    description: "Create a new user",
    operationId: "createUser",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: {
                type: "string",
                description: "User's email address",
                example: "johndoe@example.com"
              },
              username: {
                type: "string",
                description: "User's username",
                example: "johndoe"
              },
              gender: {
                type: "string",
                description: "User's gender (either Male or Female)",
                example: "Male"
              },
              password: {
                type: "string",
                description: "User's password",
                example: "password123"
              },
              confirmPassword: {
                type: "string",
                description: "User's confirm password",
                example: "password123"
              }
            },
            required: ["email", "username", "gender", "password", "confirmPassword"]
          }
        }
      }
    },
    responses: {
      201: {
        description: "User created successfully"
      },
      400: {
        description: "Invalid input provided"
      },
      500: {
        description: "Server error"
      }
    }
  }
};
exports.default = _default;