process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe("Shared Link Route", () => {
  beforeEach((done) => {
    //Before each test we empty the database in your case
    done();
  });
  /*
   * Test the /GET route
   */
  describe("/GET youtube links", () => {
    it("it should GET all the youtube links", (done) => {
      chai
        .request(server)
        .get("/api/link")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.response.should.be.a("array");
          // res.body.length.should.be.eql(9); // fixme :)
          done();
        });
    });
  });

  describe("/POST youtube link without authentication", () => {
    it("it should send an error because user not logged in", (done) => {
      const data = {
        url: "https://www.youtube.com/watch?v=KqjgLbKZ1h0",
      };
      chai
        .request(server)
        .post("/api/link")
        .send(data)
        .end((err, res) => {
          res.should.have.status(401);
          
          done();
        });
    });
  });

  describe("/POST youtube link with authentication", function () {
    it("should Register user, login user, check token and post new url", function (done) {
      chai
        .request(server)

        // register request
        .post("/api/user/register")

        // send user registration details
        .send({
          username: "tester",
          password: "tester_password",
        }) // this is like sending $http.post or this.http.post in Angular
        .end((err, res) => {
          chai
            .request(server)
            .post("/api/user/login")
            // send user login details
            .send({
              username: "tester",
              password: "tester_password",
            })
            .end((err, res) => {
              const data = {
                url: "https://www.youtube.com/watch?v=KqjgLbKZ1h0",
              };
              console.log("this runs the login part");
              res.body.should.have.property("token");
              const token = res.body.token;
              // follow up with requesting user protected page
              chai
                .request(server)
                .post("/api/link")
                .set({ Authorization: token })
                .send(data)
                .end(function (err, res) {
                  //   console.log(res);
                  res.should.have.status(200);

                  res.body.should.be.a("object");
                  res.body.should.have.property("success").eql(true);
                  res.body.response.should.have.property("title");
                  res.body.response.should.have.property("url").eql(data.url);
                  res.body.response.should.have.property("description");
                  done();
                });
            });
        });
    });
  });
});
