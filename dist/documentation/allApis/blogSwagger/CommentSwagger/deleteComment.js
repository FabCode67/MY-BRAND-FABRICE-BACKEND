"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  delete: {
    tags: ["Comment blog API"],
    summary: "Delete a comment on a specific blog",
    operationId: "deleteComment",
    parameters: [{
      in: "header",
      name: "Authorization",
      description: "User's JWT token",
      required: true,
      type: "string"
    }, {
      in: "path",
      name: "blogId",
      description: "The ID of the blog the comment belongs to",
      required: true,
      type: "string"
    }, {
      in: "path",
      name: "commentId",
      description: "The ID of the comment to delete",
      required: true,
      type: "string"
    }],
    responses: {
      200: {
        description: "Comment deleted successfully"
      },
      401: {
        description: "User is not authorized to delete this comment"
      },
      404: {
        description: "Blog or comment not found"
      },
      500: {
        description: "Server error"
      }
    }
  }
};
exports.default = _default;