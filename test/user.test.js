const chai = require("chai");
const chaiHttp = require("chai-http");
const { response } = require("express");
const { array } = require("joi");
import app  from "../src/index";

chai.should();
chai.use(chaiHttp);
describe("user API", () => {
  describe("GET /api/user", () => {
    it("should get all users", (done) => {
      chai
        .request(app)
        .get("/api/user")
        .end((err, response) => {
          response.status.should.be.equal(404);
          response.body.should.be.a("object");
          done();
        });
    });
  });

  describe("POST /api/user", () => {
    it("should create a new user", (done) => {
      const user = {
        username: "rich",
        email: "rich@gmail.com",
        gender: "Male",
        password: "12334",
        confirmPassword: "12334",
      };
      chai;
      chai
        .request(app)
        .post("/api/user")
        .send(user)
        .end((err, response) => {
          response.status.should.be.equal(404);
          response.body.should.be.a("object");
          done();
        });
    });
  });


//   describe('user API', () => {
//     it('should return the number of users in the collection', (done) => {
//         chai.request(app)
//             .get('/api/user/count') // the endpoint for counting users
//             .then((err, res) => {
//                 expect(res.body).to.not.exist;
//                 res.status.should.equal(404);
//                 res.type.should.equal('object');
//                 res.body.status.should.equal('success');
//                 res.body.message.should.equal('There are X users in the collection.'); // X should be replaced with the actual number of users
//                 done();
//             });
//     });
// });



});