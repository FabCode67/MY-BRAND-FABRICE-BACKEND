// export default {
//   delete: {
//     tags: ["Comment blog API"],
//     summary: "Delete a comment on a specific blog",
//     operationId: "deleteComment",
//     security: [{
//       BearerAuth: []
//   }],
//     parameters: [

//       {
//         in: "path",
//         name: "blogId",
//         description: "The ID of the blog the comment belongs to",
//         required: true,
//         type: "string",
//       },
//       {
//         in: "path",
//         name: "commentId",
//         description: "The ID of the comment to delete",
//         required: true,
//         type: "string",
//       },
//     ],
//     responses: {
//       200: {
//         description: "Comment deleted successfully",
//       },
//       401: {
//         description: "User is not authorized to delete this comment",
//       },
//       404: {
//         description: "Blog or comment not found",
//       },
//       500: {
//         description: "Server error",
//       },
//     },
//   },
// };
