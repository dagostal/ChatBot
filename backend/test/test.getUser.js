const chai = require('chai');
const chaiHttp = require('chai-http');
const e = require('express');

const should = chai.should();

// Import server
var server = require('../index.js');

// use chaiHttp for making the actual HTTP requests   
chai.use(chaiHttp);
describe('Get User', function () {
    beforeEach(function (done) {
        done();
    });

    afterEach(function (done) {
        // error handling
        done();
    });

    it('should return false:no user id in body', function (done) {
        chai.request(server)
            .post('/getUser')
            .send({})
            .end(function (err, res) {
                should.not.exist(err)
                should.exist(res)
                res.should.be.an('object')
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('boolean');
                res.body.should.equal(false);
                done();
            });
    });
    it('should return false: bad id', function (done) {
        chai.request(server)
            .post('/getUser')
            .send({ userId: 'not an id' })
            .end(function (err, res) {
                should.not.exist(err)
                should.exist(res)
                res.should.be.an('object')
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('boolean');
                res.body.should.equal(false);
                done();
            });
    });

    it('should return false: no user found', function (done) {
        chai.request(server)
            .post('/getUser')
            .send({ userId: '5fde41d8c80f5bc19ede2250' })
            .end(function (err, res) {
                should.not.exist(err)
                should.exist(res)
                res.should.be.an('object')
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('boolean');
                res.body.should.equal(false);
                done();
            });
    });

    it('should return user details', function (done) {
        chai.request(server)
            .post('/getUser')
            .send({ userId: '5fe16c9a0498030017b59d84' })
            .end(function (err, res) {
                should.not.exist(err)
                should.exist(res)
                res.should.be.an('object')
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.keys('id', 'email', 'name', 'careProvider', 'careProviderChannel')
                res.body["id"].should.equal('5fe16c9a0498030017b59d84');
                res.body["email"].should.equal('Dagostal77@gmail.com');
                done();
            });
    });
});