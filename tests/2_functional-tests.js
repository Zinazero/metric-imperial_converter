const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  this.timeout(5000);
  test('Convert a valid input', function (done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '10L' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, "L");
        assert.approximately(res.body.returnNum, 2.64172, 0.1);
        assert.equal(res.body.returnUnit, "gal");
        done();
      }); 
  });
  test('Invalid input conversion', function (done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '32g' })
      .end(function (err, res) {
        assert.throw(() => {
          throw new Error(res.body.error);
        }, Error, "invalid unit");
        done();
      });
  });
  test('Invalid number conversion', function (done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kg' })
      .end(function (err, res) {
        assert.throw(() => {
          throw new Error(res.body.error);
        }, Error, "invalid number");
        done();
      });
  });
  test('Both number and unit are invalid', function (done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kilomegagram' })
      .end(function (err, res) {
        assert.throw(() => {
          throw new Error(res.body.error);
        }, Error, "invalid number and unit");
        done();
      });
  });
  test('Convert with no number', function (done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: 'kg' })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, "kg");
        assert.approximately(res.body.returnNum, 2.20462, 0.1);
        assert.equal(res.body.returnUnit, "lbs");
        done();
      });
  });
  after(function() {
    chai.request(server)
      .get('/')
  });
});
