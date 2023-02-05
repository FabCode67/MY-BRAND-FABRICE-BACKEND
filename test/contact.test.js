import chaiHttp from "chai-http";
import chai from "chai";
import Contact from "../src/models/contact";
import app from "./index.test";

chai.should();
chai.use(chaiHttp);

describe("send a message", () => {
  it("visitor must fill all names, email and message", (done) => {
    const post = {
      name: "rich",
      email: "rich@gmail.com",
      message: "test",
    };
    chai
      .request(app)
      .post("/api/contact")
      .send(post)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("status");
        res.body.status.should.equal("success");
        res.body.should.have.property("data");
        done();
      });
  });

  it("should return 404 if post request fails", (done) => {
    const post = {};
    chai
      .request(app)
      .post("/api/contact")
      .send(post)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property("status");
        res.body.should.have.property("message");
        done();
      });
  });
});

describe("GET all messages", () => {
  let token;

  before(async () => {
    const response = await chai.request(app).post("/api/login").send({
      username: "test",
      password: "password",
    });
    token = response.body.data;
  });

  it("it should GET all the messages", (done) => {
    chai
      .request(app)
      .get("/api/contact")
      .set("Authorization", token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("status");
        res.body.should.have.property("data");
        done();
      });
  });
});

describe("Count all users by authorized user", () => {
  let token;

  before(async () => {
    const response = await chai.request(app).post("/api/login").send({
      username: "test",
      password: "password",
    });
    token = response.body.data;
  });

  it("it should count all the contact", (done) => {
    chai
      .request(app)
      .get("/api/contact/count")
      .set("Authorization", token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("status");
        res.body.should.have.property("message");
        done();
      });
  });
});

describe("Delete single contact", () => {
  let contact;
  let token;
  before(async () => {
    const response = await chai.request(app).post("/api/login").send({
      username: "test",
      password: "password",
    });
    token = response.body.data;
  });

  it("it should delete a contact by the given id", (done) => {
    contact = new Contact({
      name: "rich1",
      email: "rich1@gmail.com",
      message: "test1",
    });
    contact.save((error, contact) => {
      chai
        .request(app)
        .delete(`/api/contact/${contact._id}`)
        .set("Authorization", token)
        .end((err, res) => {
          res.should.have.status(204);
          res.body.should.be.empty;
          done();
        });
    });
  });

  it("it should return 404 if message not found", (done) => {
    chai
      .request(app)
      .delete(`/api/contact/${contact._id}`)
      .set("Authorization", token)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eql("fail");
        res.body.should.have.property("message").eql("message not found");
        done();
      });
  });
});
