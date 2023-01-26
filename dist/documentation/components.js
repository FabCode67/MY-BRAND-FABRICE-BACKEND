"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  component: {
    schemas: {
      // user schema
      User: {
        type: "object",
        // data type
        properties: {
          _id: {
            type: "string",
            // data-type
            description: "User identification number",
            // desc
            example: "ytyVgh" // example of an id
          },

          email: {
            type: "string",
            // data-type
            description: "User's email",
            // desc
            example: "johndoe@example.com" // example of an email
          },

          username: {
            type: "string",
            // data-type
            description: "User's username",
            // desc
            example: "JohnDoe" // example of a username
          },

          gender: {
            type: "string",
            // data-type
            description: "User's gender",
            // desc
            example: "male" // example of a gender
          },

          password: {
            type: "string",
            // data-type
            description: "User's password",
            // desc
            example: "password123" // example of a password
          },

          confirmPassword: {
            type: "string",
            // data-type
            description: "User's confirm password",
            // desc
            example: "password123" // example of a confirm password
          }
        }
      },

      // contact schema
      Contact: {
        type: "object",
        // data type
        properties: {
          _id: {
            type: "string",
            // data-type
            description: "Contact identification number",
            // desc
            example: "ytyVgh" // example of an id
          },

          name: {
            type: "string",
            // data-type
            description: "Contact's name",
            // desc
            example: "John Doe" // example of a name
          },

          email: {
            type: "string",
            // data-type
            description: "Contact's email",
            // desc
            example: "johndoe@example.com" // example of an email
          },

          message: {
            type: "string",
            // data-type
            description: "Contact's message",
            // desc
            example: "Hello, I would like to know more about your product" // example of a message
          }
        }
      }
    },

    // blog schema
    Blog: {
      type: "object",
      // data type
      properties: {
        _id: {
          type: "string",
          // data-type
          description: "Blog identification number",
          // desc
          example: "ytyVgh" // example of an id
        },

        blogTitle: {
          type: "string",
          // data-type
          description: "Blog's title",
          // desc
          example: "5 Tips for Writing a Great Blog Post" // example of a title
        },

        blogContent: {
          type: "string",
          // data-type
          description: "Blog's content",
          // desc
          example: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." // example of content
        },

        blogImage: {
          type: "string",
          // data-type
          description: "Blog's image url",
          // desc
          example: "https://example.com/blog/image.jpg" // example of an image url
        },

        comments: {
          type: "array",
          // data type
          items: {
            type: "object",
            properties: {
              username: {
                type: "string",
                description: "Username of the person who made the comment",
                example: "JohnDoe"
              },
              comment: {
                type: "string",
                description: "The comment made by the user",
                example: "Great post, I learned a lot!"
              }
            }
          }
        }
      }
    }
  }
};
exports.default = _default;