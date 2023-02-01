
import chaiHttp from 'chai-http';
import chai from 'chai';
import Blog from '../src/models/blog';
import app from '../test/index.test';
import fs from 'fs';
import path from 'path';
import expect from 'expect';
import cloudinary from 'cloudinary';




describe("", () => {

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


  it("It Should return 409 Blog title and content already exist", async () => {
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

    res.should.have.status(409);
    res.body.should.have.property("status").eql("fail");
    res.body.should.have.property("message");
  });
});


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
  let blog;
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
   blog = new Blog({ blogTitle: 'Test Blog', blogContent: 'Test Content' });

    blog.save((error, blog) => {
      chai.request(app)
        .get(`/api/blog/${blog._id}`)
        .set("Authorization", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('success');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('_id').eql(blog._id.toString());
          res.body.data.should.have.property('blogTitle').eql('Test Blog');
          res.body.data.should.have.property('blogContent').eql('Test Content');
          done();
        });
    });
  });

  it('it should return 404 if blog not found', (done) => {
    blog = new Blog({ blogTitle: 'Test Blog not found', blogContent: 'Test Content not found' });
       chai.request(app)
         .get(`/api/blog/${blog._id}`)
         .set("Authorization", token)
         .end((err, res) => {
           res.should.have.status(404);
           res.body.should.be.a('object');
           res.body.should.have.property('status').eql('fail');
           res.body.should.have.property('message');
           done();
         });
   });
})
 

describe("Delete single blog", () => {
  let blog;
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
     blog = new Blog({ blogTitle: "Test Blog", blogContent: "Test Content" });
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
       .delete(`/api/blog/${blog._id}`)
       .set("Authorization", token)
       .end((err, res) => {
         res.should.have.status(404);
         res.body.should.have.property("message").eql("blog not found");
         done();
       });
   
 });
  it("it should return 404 if endpoint not found", (done) => {
    chai
      .request(app)
      .delete("/api/blog/invalidId")
      .set("Authorization", token)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql("fail");
        res.body.should.have.property("message").eql("endpoint not found");
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
  


  describe('It should update blog', () => {

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

    it("should return 409", async () => {
      const blogDataToUpdate = new Blog ({
        blogTitle: "Test t blog",
        blogContent: "Test t blog content",
        blogImage: "image.jpg",
      });
  
      const updatedBlog ={
        blogTitle: "Test t blog",
        blogContent: "Test t blog content",
        blogImage: "image.jpg",
      };
  
      const res = await chai
        .request(app)
        .patch(`/api/blog/${blogDataToUpdate._id}`)
        .set('Authorization',token)
        .attach('blogImage', fs.readFileSync(path.join(__dirname, 'blog5.jpg')), 'blog5.jpg')  
        .field("blogTitle", updatedBlog.blogTitle)
        .field("blogContent", updatedBlog.blogContent)
  
        res.should.have.status(409);
        res.body.should.have.property("status").eql("fail");
        res.body.should.have.property("message")
  
      });




  it("should update the existting blog", async () => {
    const blogDataToUpdate = new Blog ({
      blogTitle: "Test t blog",
      blogContent: "Test t blog content",
      blogImage: "image.jpg",
    });

    const updatedBlog ={
      blogTitle: "Test update blog",
      blogContent: "Test update blog content",
      blogImage: "image.jpg",
    };

    const res = await chai
      .request(app)
      .patch(`/api/blog/${blogDataToUpdate._id}`)
      .set('Authorization',token)
      .attach('blogImage', fs.readFileSync(path.join(__dirname, 'blog5.jpg')), 'blog5.jpg')  
      .field("blogTitle", updatedBlog.blogTitle)
      .field("blogContent", updatedBlog.blogContent)

      res.should.have.status(200);
      res.body.should.have.property("status").eql("success");
      res.body.should.have.property("message")

    });

  })