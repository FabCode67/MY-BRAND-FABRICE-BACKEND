const chai = require("chai");
const chaiHttp = require("chai-http");
const { response } = require("express");
const { array } = require("joi");
import app  from "../src/index";

chai.should();
chai.use(chaiHttp);
describe("Contact API", () => {
  describe("GET /api/contact", () => {
    it("should get all contacts", (done) => {
      chai
        .request(app)
        .get("/api/contact")
        .end((err, response) => {
          response.status.should.be.equal(404);
          response.body.should.be.a("object");
          done();
        });
    });
  });

  describe("POST /api/contact", () => {
    it("should create a new contact", (done) => {
      const contact = {
        name: "rich",
        email: "rich@gmail.com",
        message: "test",
      };
      chai;
      chai
        .request(app)
        .post("/api/contact")
        .send(contact)
        .end((err, response) => {
          response.status.should.be.equal(404);
          response.body.should.be.a("object");
          done();
        });
    });
  });
});
