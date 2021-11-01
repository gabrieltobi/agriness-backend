const expect = require("chai").expect;
const supertest = require("supertest");
const api = supertest("http://127.0.0.1:8080/api/v1");

describe("Auth", function () {
  it("should return a 200 response", function (done) {
    api
      .post("/login")
      .set("Accept", "application/json")
      .send({
        user: "admin@gmail.com",
        password: "Abc123",
      })
      .expect(200, done);
  });

  it("should return a 404 response", function (done) {
    api
      .post("/login")
      .set("Accept", "application/json")
      .send({
        user: "wrong@gmail.com",
        password: "123321",
      })
      .expect(404, done);
  });
});
