import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../test/index.test';
import Blog from '../src/models/blog';
import User from '../src/models/user';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
const secretKey = process.env.SECRET_KEY;
chai.should();
chai.use(chaiHttp);

describe("Adding a comment to a blog", () => {
  let token;
  let blog;

  beforeEach(async () => {
    // Create a user and sign in to generate a JWT
    const user = new User({ username: "test", password: "password" });
    await user.save();
    const response = await chai
    .request(app)
    .post('/api/login')
    .send({
      username: 'test',
      password: 'password'
    });
  token = response.body.data;

    // Create a blog to add a comment to
    blog = new Blog({ blogTitle: "Test Blog", blogContent: "Test content" });
    await blog.save();
  });
  it("it should return 404 if blog to add comment not found", (done) => {
    blog = new Blog({ blogTitle: "Testy Blog", blogContent: "Test content" });

    chai
      .request(app)
      .post(`/api/blog/${blog._id}/comment`)
      .set("Authorization", token)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property("message").eql("Blog not to add coment found");
        done();
      });
  
});




  it("Should add a comment to a blog", async () => {
    const res = await chai
      .request(app)
      .post(`/api/blog/${blog._id}/comment`)
      .set("Authorization", token)
      .send({ comment: "Test comment" });

    res.should.have.status(201);
    res.body.status.should.be.equal("success");
    res.body.message.should.be.equal("Comment added successfully");

    // Check that the comment has been added to the blog
    const updatedBlog = await Blog.findById(blog._id);
    updatedBlog.comments.length.should.be.equal(1);
    updatedBlog.comments[0].username.should.be.equal("test");
    updatedBlog.comments[0].comment.should.be.equal("Test comment");
  });


  it("Should return 401 if no JWT is provided", async () => {
    const res = await chai
      .request(app)
      .post(`/api/blog/${blog._id}/comment`)
      .send({ comment: "Test comment" });

    res.should.have.status(401);
    res.body.status.should.be.equal("fail");
    res.body.message.should.be.equal("Unauthorized");
  });

});





describe("It should count comments for a blog", () => {
  let token;
  let blogId;
  before(async () => {
    // Log in to get a valid token
    const response = await chai
      .request(app)
      .post("/api/login")
      .send({
        username: "test",
        password: "password"
      });
    token = response.body.data;

    // Create a blog to test counting comments
    const blogData = {
      blogTitle: "Test error blog",
      blogContent: "Test blog error content",
      blogImage: "image.jpg",
      comments: [
        {
          username: "User 1",
          comment: "Comment 1"
        },
        {
          username: "User 2",
          comment: "Comment 2"
        }
      ]
    };
    const createdBlog = await chai
      .request(app)
      .post("/api/blog")
      .set("Authorization", token)
      .attach("blogImage", fs.readFileSync(path.join(__dirname, "blog5.jpg")), "blog5.jpg")
      .field("blogTitle", blogData.blogTitle)
      .field("blogContent", blogData.blogContent)
      .field("comments", JSON.stringify(blogData.comments));
    blogId = createdBlog.body.data._id;
  });




  it("should count comments for a blog", async () => {
    const res = await chai
      .request(app)
      .get(`/api/blog/${blogId}/comment/count`)
      .set("Authorization", token);

    res.should.have.status(200);
    res.body.should.have.property("status").eql("success");
    res.body.should.have.property("message").eql(`Blog has 0 comments.`);

  });

});




