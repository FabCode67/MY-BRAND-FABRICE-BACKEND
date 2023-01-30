// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const { response } = require("express");
// const { array } = require("joi");
// import app  from "../index";

// chai.should();
// chai.use(chaiHttp);
// describe("Contact API", () => {
//   describe("GET /api/contact", () => {
//     it("should get all contacts", (done) => {
//       chai
//         .request(app)
//         .get("/api/contact")
//         .end((err, response) => {
//           response.status.should.be.equal(404);
//           response.body.should.be.a("object");
//           done();
//         });
//     });
//   });

//   describe("POST /api/contact", () => {
//     it("should create a new contact", (done) => {
//       const contact = {
//         name: "rich",
//         email: "rich@gmail.com",
//         message: "test",
//       };
//       chai;
//       chai
//         .request(app)
//         .post("/api/contact")
//         .send(contact)
//         .end((err, response) => {
//           response.status.should.be.equal(404);
//           response.body.should.be.a("object");
//           done();
//         });
//     });
//   });
// });

// import app from '../index'
// import chai from 'chai'
// import chaiHttp from 'chai-http'
// import contact from '../models/contact';
// import { response } from 'express';

// chai.should();
// chai.use(chaiHttp)

// describe("contact" ,()=>{




//   describe("GET /api/contact",()=>{
//     it("should get a contact",(done)=>{


//       beforeEach(async (done)=>{

//         const post =  new contact({
//           name: "rich",
//           email: "rich@gmail.com",
//           message: "test this",
//         });
//         await post.save();

//       })


//       chai.request(app)
//       .get("/api/contact")
//       .end((err,response)=>{
//          response.should.have.status(200);
//          response.body.should.be.a("object");
//         //  response.body.length.should.be.above(1);
//          done()
//       })
//     })
//   })





// })

import chaiHttp from 'chai-http';
import chai from 'chai';
import contact from '../models/contact';
import app from '../index';

chai.should();
chai.use(chaiHttp);

describe('send a message', () => {
  it('visitor must fill all names, email and message', (done) => {
    const post = {
      name: 'rich',
      email: 'rich@gmail.com',
      message: 'test',
    };
    chai
      .request(app)
      .post('/api/contact')
      .send(post)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status');
        res.body.status.should.equal('success');
        res.body.should.have.property('data');
        done();
      });
  });

  it('should return 404 if post request fails', (done) => {
    const post = {};
    chai
      .request(app)
      .post('/api/contact')
      .send(post)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('status');
        res.body.should.have.property('message');
        done();
      });
  });
});

describe('GET all messages', () => {
  it('it should GET all the messages', (done) => {
    chai
      .request(app)
      .get('/api/contact')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("status")
        res.body.should.have.property("data")
        done();
      });
  });
});