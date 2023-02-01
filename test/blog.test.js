
import chaiHttp from 'chai-http';
import chai from 'chai';
import Blog from '../src/models/blog';
import app from '../test/index.test';
import fs from 'fs';
import path from 'path';
import expect from 'expect';
import cloudinary from 'cloudinary';



describe("POST a blog", () => {

  let token;
  before(async () => {
    const response = await chai
      .request(app)
      .post('/api/login')
      .send({
        username: 'test',
        password: 'password'
      });
    token = response.body.data;
  });

  beforeEach(async () => {
    try {
      await Blog.deleteMany({});
    } catch (error) {
    }
  });

  it("should create a new blog", async () => {
    const blogData = {
      blogTitle: "Test t blog",
      blogContent: "Test t blog content",
      blogImage: "image.jpg",
    };

    const res = await chai
      .request(app)
      .post("/api/blog")
      .set("Authorization", token)
      .attach('blogImage', fs.readFileSync(path.join(__dirname, 'blog5.jpg')), 'blog5.jpg')  
      .field("blogTitle", blogData.blogTitle)
      .field("blogContent", blogData.blogContent);

    res.should.have.status(201);
    res.body.should.have.property("status").eql("success");
    res.body.should.have.property("data");
    res.body.data.should.have.property("blogTitle").eql(blogData.blogTitle);
    res.body.data.should.have.property("blogContent").eql(blogData.blogContent);
    res.body.data.should.have.property("blogImage");
  });
});



describe('Get single blog', () => {
  let token;
  before(async () => {
    const response = await chai
      .request(app)
      .post('/api/login')
      .send({
        username: 'test',
        password: 'password'
      });
    token = response.body.data;
  });

  it('it should GET a blog by the given id', (done) => {
  const blog = new Blog({ blogTitle: 'Test Blog', blogContent: 'Test Content' });

    blog.save((error, blog) => {
      chai.request(app)
        .get(`/api/blog/${blog._id}`)
        .set("Authorization", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('blog');
          res.body.blog.should.be.a('object');
          res.body.blog.should.have.property('_id').eql(blog._id.toString());
          res.body.blog.should.have.property('blogTitle').eql('Test Blog');
          res.body.blog.should.have.property('blogContent').eql('Test Content');
          done();
        });
    });
  });

})
 

describe("Delete single blog", () => {
  let token;
  before(async () => {
    const response = await chai
      .request(app)
      .post("/api/login")
      .send({
        username: "test",
        password: "password",
      });
    token = response.body.data;
  });

  it("it should delete a blog by the given id", (done) => {
    const blog = new Blog({ blogTitle: "Test Blog", blogContent: "Test Content" });
    blog.save((error, blog) => {
      chai
        .request(app)
        .delete(`/api/blog/${blog._id}`)
        .set("Authorization", token)
        .end((err, res) => {
          res.should.have.status(204);
          res.body.should.be.empty;
          done();
        });
    });
  });

  it("it should return 404 if blog not found", (done) => {
    chai
      .request(app)
      .delete("/api/blog/invalidId")
      .set("Authorization", token)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql("fail");
        res.body.should.have.property("message").eql("Blog not found");
        done();
      });
  });
});





describe('GET all blog', () => {
    it('should GET all blog', (done) => {
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
  
