"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  get: {
    tags: ["Contact API"],
    description: "Get all messages",
    operationId: "getContact",
    parameters: [],
    responses: {
      200: {
        description: "messages were obtained",
        content: {
          "application/json": {
            schema: {
              type: "objext",
              example: {
                email: "fab@gmail.com",
                name: "fab",
                message: "Hey i wabt tio kjnow much more about your self"
              }
            }
          }
        }
      }
    }
  }
};
exports.default = _default;