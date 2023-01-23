module.exports ={
   
          get: {
            tags: ["Comment blog API"],
            summary: "Count the number of comments on a specific blog",
            operationId: "countComments",
            parameters: [
              {
                in: "path",
                name: "id",
                description: "ID of the blog",
                required: true,
                type: "string"
              }
            ],
            responses: {
              200: {
                description: "Comment count retrieved successfully",
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      description: "Comment count message"
                    }
                  }
                }
              },
              404: {
                description: "Blog not found"
              },
              500: {
                description: "Server error"
              }
            }
          }
        }
