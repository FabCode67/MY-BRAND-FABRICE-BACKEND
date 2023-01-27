// export default {
//   get: {
//     tags: ["Authentication"],
//     description: "Get the profile of the logged-in user",
//     operationId: "getProfile",
//     parameters: [
//       {
//         name: "Authorization",
//         in: "header",
//         description: "token",
//         required: true,
//         type: "string",
//       },
//     ],
//     responses: {
//       200: {
//         description: "Profile retrieved successfully",
//         schema: {
//           type: "object",
//           properties: {
//             _id: {
//               type: "string",
//               description: "ID of the user",
//             },
//             username: {
//               type: "string",
//               description: "Username of the user",
//             },
//             email: {
//               type: "string",
//               description: "Email of the user",
//             },
//             isAdmin: {
//               type: "boolean",
//               description: "Indicates if the user is an administrator",
//             },
//           },
//         },
//       },
//       401: {
//         description: "Unauthorized",
//       },
//     },
//   },
// };




export default {
  get: {
    tags: ["Authentication"],
    summary: "Retrieve the user's profile",
    operationId: "getProfile",
    parameters: [
        {
            name: "Authorization",
            in: "header",
            required: true,
            type: "apiKey",
            description: "Bearer token"
        }
    ],
    responses: {
        200: {
            description: "Successful profile retrieval",
            schema: {
                type: "object",
                properties: {
                    status: {
                        type: "string"
                    },
                    data: {
                        type: "object"
                    }
                }
            }
        },
        401: {
            description: "Unauthorized - Invalid or missing token"
        }
    },
  },
};
