const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

// Import server
var server = require('../index.js');

// use chaiHttp for making the actual HTTP requests   
chai.use(chaiHttp);
describe('Signup', function () {
    beforeEach(function (done) {
        done();
    });

    afterEach(function (done) {
        // error handling
        done();
    });

    it('should return error:missing email or password or name', function (done) {
        chai.request(server)
            .post('/signup')
            .send({})
            .end(function (err, res) {
                should.not.exist(err)
                should.exist(res)
                res.should.be.an('object')
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.keys('error')
                res.body["error"].should.equal('missing email or password or name');
                done();
            });
    });
    it('should return error:missing email or password or name', function (done) {
        chai.request(server)
            .post('/signup')
            .send({ email: "dagostal77@gmail.com" })
            .end(function (err, res) {
                should.not.exist(err)
                should.exist(res)
                res.should.be.an('object')
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.keys('error')
                res.body["error"].should.equal('missing email or password or name');
                done();
            });
    });
    it('should return error:missing email or password or name', function (done) {
        chai.request(server)
            .post('/signup')
            .send({ email: "dagostal77@gmail.com", password: 123 })
            .end(function (err, res) {
                should.not.exist(err)
                should.exist(res)
                res.should.be.an('object')
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.keys('error')
                res.body["error"].should.equal('missing email or password or name');
                done();
            });
    });
    it('should return error:missing email or password or name', function (done) {
        chai.request(server)
            .post('/signup')
            .send({ name: "dagostal77@gmail.com", password: 123 })
            .end(function (err, res) {
                should.not.exist(err)
                should.exist(res)
                res.should.be.an('object')
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.keys('error')
                res.body["error"].should.equal('missing email or password or name');
                done();
            });
    });

    it('should return error expected password to be string', function (done) {
        const randomNumber = Math.floor(Math.random() * Math.floor(10000));
        chai.request(server)
            .post('/signup')
            .send({ email: "testing" + randomNumber + "@gmail.com", password: randomNumber, name: "test", careProvider: "dr. a" })
            .end(function (err, res) {
                should.not.exist(err)
                should.exist(res)
                res.should.be.an('object')
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.keys('error')
                res.body["error"].should.equal('expected password to be string');
                done();
            });
    });

    it('should return sendbird error user already exists', function (done) {
        const randomNumber = Math.floor(Math.random() * Math.floor(10000));
        chai.request(server)
            .post('/signup')
            .send({ email: "dagostal77@gmail.com", password: randomNumber, name: "test", careProvider: "dr. a" })
            .end(function (err, res) {
                should.not.exist(err)
                should.exist(res)
                res.should.be.an('object')
                res.should.have.status(200);
                res.should.be.json;
                res.body["error"].should.equal('Error: Error: "user_id" violates unique constraint.');
                done();
            });
    });

    it('should create and return new user id and email', function (done) {
        const randomNumber = Math.floor(Math.random() * Math.floor(10000));
        chai.request(server)
            .post('/signup')
            .send({ email: "testing" + randomNumber + "@gmail.com", password: randomNumber.toString(), name: "test", careProvider: "dr. a" })
            .end(function (err, res) {
                should.not.exist(err)
                should.exist(res)
                res.should.be.an('object')
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.keys('id', 'email')
                done();
            });
    });
});