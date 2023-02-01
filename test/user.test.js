
import chaiHttp from 'chai-http';
import chai from 'chai';
import User from '../src/models/user';
import dotenv from "dotenv";
import app from '../test/index.test'

dotenv.config();
chai.should();
chai.use(chaiHttp);


describe('', () => {
  it('it should 409 Email or username already exists', (done) => {
    chai
      .request(app)
      .post('/api/user')
      .send({
        email: "test@test.com",
        username: "test",
        gender: "Male",
        password: "password",
        confirmPassword: "password",
      })
      .end((err, res) => {
        res.should.have.status(409);
        res.body.should.have.property("status");
        res.body.should.have.property("message");
        done();
      });
  });
 
});


describe('POST a user', () => {
    beforeEach(async () => {
        try {
          await User.deleteMany({});
        } catch (error) {
        }
      });



      it('it should return 400 if password and confirmpassword not match', (done) => {
        chai
          .request(app)
          .post('/api/user')
          .send({
            email: "test@test.com",
            username: "test",
            gender: "Male",
            password: "passwor",
            confirmPassword: "password",
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            done();
          });
      });

      it('it should return 400 if  not Male or female', (done) => {
        chai
          .request(app)
          .post('/api/user')
          .send({
            email: "test@test.com",
            username: "test",
            gender: "other",
            password: "password",
            confirmPassword: "password",
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            done();
          });
      });

      it('it should return 400 for envalid email', (done) => {
        chai
          .request(app)
          .post('/api/user')
          .send({
            email: "testtest.com",
            username: "test",
            gender: "Male",
            password: "password",
            confirmPassword: "password",
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            done();
          });
      });

      it('it should return 400 for envalid username', (done) => {
        chai
          .request(app)
          .post('/api/user')
          .send({
            email: "test@test.com",
            username: "te",
            gender: "Male",
            password: "password",
            confirmPassword: "password",
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property("status");
            res.body.should.have.property("message");
            done();
          });
      });


    it('it should POST a new user', (done) => {
      chai
        .request(app)
        .post('/api/user')
        .send({
          email: "test@test.com",
          username: "test",
          gender: "Male",
          password: "password",
          confirmPassword: "password",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("status");
          res.body.should.have.property("data");
          done();
        });
    });

});



  describe('Login', () => {
    let token;
    it('it should log in a user', (done) => {
      chai
        .request(app)
        .post('/api/login')
        .send({
          username: "test",
          password: "password",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("status");
          res.body.should.have.property("message");
          res.body.should.have.property("data");
          token = res.body.data;
          done();
        });
    });
  
    
  });
  
    
    // it('it should return 404 for invalid username', (done) => {
    //   chai
    //     .request(app)
    //     .post('/api/login')
    //     .send({
    //       username: "in",
    //       password: "password",
    //     })
    //     .end((err, res) => {
    //       res.should.have.status(401);
    //       res.body.should.have.property("status");
    //       res.body.should.have.property("message");
    //       done();
    //     });
    // });
    
    it('it should return 401 for invalid password and username', (done) => {
      chai
        .request(app)
        .post('/api/login')
        .send({
          username: "te",
          password: "invalid",
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("status");
          res.body.should.have.property("message");
          done();
        });
    });
    
    it('it should return 401 for error logging in', (done) => {
      chai
        .request(app)
        .post('/api/login')
        .send({
          username: "test",
          password: "error",
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property("status");
          res.body.should.have.property("message");
          done();
        });
    });
  



  describe('GET /api/profile', () => {
    it('it should return 401 if the token is not provided', (done) => {
      chai
        .request(app)
        .get('/api/profile')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          res.body.error.should.equal('Unauthorized');
          done();
        });
    });
        let token
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
  
    it('it should return the user profile if the token is valid', (done) => {
      
          chai
            .request(app)
            .get('/api/profile')
            .set('Authorization', token)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('status');
              res.body.should.have.property('data');
              res.body.data.should.have.property('_id');
              res.body.data.should.have.property('email');
              done();
            });
        });
   
    
      
    it('it should return 401 if the token is invalid', (done) => {
      const token = 'invalidtoken';
      chai
        .request(app)
        .get('/api/profile')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('status');
          res.body.should.have.property('error');
          res.body.error.should.equal('Unauthorized');
          done();
        });
    });
  });
  




  
describe('GET all users', () => {
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

  it('it should GET all users', (done) => {
    chai
      .request(app)
      .get('/api/user')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        done();
      });
  });
});







describe("Count Users", () => {
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
  it("should return the number of users in the collection for an authorized user", (done) => {
    chai
      .request(app)
      .get("/api/user/count")
      .set("Authorization", token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("status");
        res.body.should.have.property("message");
        done();
      });
  });

  it("should return an error if counting users fails", (done) => {
    const originalCountDocuments = User.countDocuments;
    User.countDocuments = () => {
      throw new Error("Error counting users");
    };

    chai
      .request(app)
      .get("/api/user/count")
      .set("Authorization", token)
      .end((err, res) => {
        User.countDocuments = originalCountDocuments;
        res.should.have.status(500);
        res.body.should.have.property("status");
        res.body.should.have.property("message");
        res.body.message.should.be.equal("Error counting users");
        done();
      });
  });
});
  
  

describe("Delete single user", () => {
  let user
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

  it("it should delete a user by the given id", (done) => {
     user = new 
    User({email: "test@test.com",
    username: "test",
    gender: "Male",
    password: "password",
    confirmPassword: "password",
   });
    user.save((error, user) => {
      chai
        .request(app)
        .delete(`/api/user/${user._id}`)
        .set("Authorization", token)
        .end((err, res) => {
          res.should.have.status(204);
          res.body.should.be.empty;
          done();
        });
    });
  });

  it("it should return 404 if user not found", (done) => {

    chai
      .request(app)
      .delete(`/api/user/${user._id}`)
      .set("Authorization", token)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql("fail");
        res.body.should.have.property("message").eql("user not found");
        done();
      });
  });
});