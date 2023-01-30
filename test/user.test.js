
import  request  from 'request';
import chaiHttp from 'chai-http';
import chai from 'chai';
import mongoose from 'mongoose';
import  jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import User from '../src/models/user';
import dotenv from "dotenv";

dotenv.config();
const secretKey = process.env.SECRETKEY;
import app from '../src/index'

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
          done();
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
  
    // it("should return the user profile if the token is valid", (done) => {
    //     // create a token and send a GET request to the /api/profile endpoint
    //     const token = jwt.sign({ userId: User._id }, secretKey);
    //     request(app)
    //       .get("/api/profile")
    //       .set("Authorization", `Bearer ${token}`)
    //       .expect(200)
    //       .then((res) => {
    //         // check that the response is as expected
    //         expect(res.body.status).toBe("success");
    //         expect(res.body.data._id).toBe(User._id.toString());
    //         done();
    //       });
    //   });
      
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
  

// describe('GET all users', () => {
//     it('it should GET all users', (done) => {
//       chai
//         .request(app)
//         .get('/api/user')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.have.property("status");
//           res.body.should.have.property("data");
//           done();
//         });
//     });
//   });
  
  
          
          
          
          
  