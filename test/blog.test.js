
import chaiHttp from 'chai-http';
import chai from 'chai';
import Blog from '../src/models/blog';
import app from '../test/index.test';
import fs from 'fs';
import path from 'path';



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
  