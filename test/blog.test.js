// const chai = require("chai");
// const chaiHttp = require("chai-http");
// import app from "../src/index";

// // const path = require('path');
// // const imagePath = path.join(__dirname, '..', 'uploads', 'blog5.jpg');

// chai.use(chaiHttp);
// const { expect } = chai;

// describe("delete a blog", () => {



//   it('delete a blog',  async() => {
//     await request(app)
//      .delete('/blog/:id')
//      .set({
//        token:
//          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlzaEFrZXZpbjQ1LmNvbSIsImlhdCI6MTY3NDUzNjQ3NX0.MzC4RMpIrpRpj9hhCgZao4AbeQcqv6gVh2mfBdEOWBU',
//      })
//      .expect(function (res) {
//        expect(res.status).toBe(200);
//      });
//  });





//   // it("should create a new blog", (done) => {
//   //   const blog = {
//   //     blogTitle: "Test Blog Title",
//   //     blogContent: "Test Blog Content",
//   //     blogImage: imagePath,
//   //   };

//   //   chai
//   //   .request(app)
//   //   .post("/api/blog")
//   //   .attach("blogImage", imagePath)
//   //   .field("blogTitle", blog.blogTitle)
//   //   .field("blogContent", blog.blogContent)
//   //   .end((err, res) => {
//   //     expect(err).to.be.null;
//   //     expect(res).to.have.status(404);
//   //     expect(res.body.data).to.have.property("blogTitle", blog.blogTitle);
//   //     expect(res.body.data).to.have.property("blogContent", blog.blogContent);
//   //     expect(res.body.data).to.have.property("blogImage");
//   //     done();
//   //     });
//   // });
// });
