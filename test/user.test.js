
import chaiHttp from 'chai-http';
import chai from 'chai';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../src/models/user';
import dotenv from "dotenv";
import app from '../test/index.test'

dotenv.config();
chai.should();
chai.use(chaiHttp);
describe('POST a user', () => {

    beforeEach(async () => {
        try {
          await User.deleteMany({});
        } catch (error) {
        }
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
  
    
    it('it should return 404 for invalid username', (done) => {
      chai
        .request(app)
        .post('/api/login')
        .send({
          username: "i",
          password: "password",
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("status");
          res.body.should.have.property("message");
          res.body.status.should.equal("fail");
          
          done();
        });
    });
    
    it('it should return 401 for invalid password', (done) => {
      chai
        .request(app)
        .post('/api/login')
        .send({
          username: "test",
          password: "invalid",
        })
        .end((err, res) => {
          res.should.have.status(401);
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


describe("deleteUser", () => {
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

  it("should delete a user by id for an authorized user", (done) => {
    chai
      .request(app)
      .delete(`/api/user/${User._id}`)
      .set("Authorization", token)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property("status");
        res.body.should.have.property("message");
        res.body.status.should.equal("fail");
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
  
  
          

// describe('deleting user', () => {

  

//   beforeEach((done) => {
//     const user = new User({
//       name: "Johnn Doe",
//       email: "johngdoe@example.com",
//       gender: "Male",
//       password: "password123",
//       confirmPassword: "password123",
//     });
//     user.save((err) => {
//       done();
//     });
//   });

//   afterEach((done) => {
//     User.deleteMany({}, (err) => {
//       done();
//     });
//   });

  
//   let token;

//   before(async () => {
//     const response = await chai
//       .request(app)
//       .post('/api/login')
//       .send({
//         username: 'test',
//         password: 'password'
//       });
//     token = response.body.data;
//   });
//   it('should delete a single user by id', (done) => {
//     User.findOne({ name: "John Doe" })
//       .then((user) => {
//         chai.request(app)
//           .delete(`/api/user/${user._id}`)
//           .set("Authorization", token)
//           .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a('object');
//             res.body.should.have.property('status').eql('success');
//             res.body.should.have.property('message').eql('User deleted successfully');
//             done();
//           });
//       });
//   });

//   it('should return 404 if the user does not exist', (done) => {
//     chai.request(app)
//       .delete('/api/user/nofounded')
//       .set("Authorization", token)
//       .end((err, res) => {
//         res.should.have.status(404);
//         res.body.should.be.a('object');
//         res.body.should.have.property('status').eql('fail');
//         res.body.should.have.property('message').eql('user not found');
//         done();
//       });
//   });
// });
