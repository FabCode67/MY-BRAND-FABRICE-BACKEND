"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  post: {
    tags: ["Contact API"],
    description: "Post a new contact message",
    operationId: "postContact",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "Contact's name",
                example: "John Doe"
              },
              email: {
                type: "string",
                description: "Contact's email address",
                example: "johndoe@example.com"
              },
              message: {
                type: "string",
                description: "Contact's message",
                example: "Hello, I would like to know more about your product"
              }
            },
            required: ["name", "email", "message"]
          }
        }
      }
    },
    responses: {
      201: {
        description: "Contact message posted successfully"
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