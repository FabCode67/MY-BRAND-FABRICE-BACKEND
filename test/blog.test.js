

import chaiHttp from 'chai-http';
import chai from 'chai';
import contact from '../src/models/contact';
import app from '../src/index';


// describe("POST a blog", () => {
//   beforeEach(async () => {
//     try {
//       await Blog.deleteMany({});
//     } catch (error) {}
//   });

//   it("should create a new blog", async () => {
//     const blogData = {
//       blogTitle: "Test blog",
//       blogContent: "Test blog content",
//       blogImage: "blog5.jpg",
//     };

//     const res = await chai
//       .request(app)
//       .post("/api/blog")
//       .attach("image", "blog5.jpg")
//       .field("blogTitle", blogData.blogTitle)
//       .field("blogContent", blogData.blogContent);

//     res.should.have.status(201);
//     res.body.should.have.property("status").eql("success");
//     res.body.should.have.property("data");
//     res.body.data.should.have.property("blogTitle").eql(blogData.blogTitle);
//     res.body.data.should.have.property("blogContent").eql(blogData.blogContent);
//     res.body.data.should.have.property("blogImage");
//   });
// });


describe('GET all blogs', () => {
    it('should GET all blogs', (done) => {
      chai
        .request(app)
        .get('/api/blog')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("status")
          res.body.should.have.property("data")
          done();
        });
    });
  });
  