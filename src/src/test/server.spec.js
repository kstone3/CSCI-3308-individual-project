const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const { assert, expect } = chai;
describe("Server!", () => {
  it("Database should start out empty", done => {
    chai.request(server)
    .get('/searches')
    .end((err, req) => {
        req.body.should.not.have.keys('title', 'lang', 'runtime', 'img', 'link');
        done();
      });
  })
  it("Main pages load properly", done => {
    chai.request(server)
    .get('/main')
    .end((err, req) => {
        expect(req).to.have.status(200);
        done();
      });
  })
})