const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

// Import server
var server = require('../index.js');

// use chaiHttp for making the actual HTTP requests   
chai.use(chaiHttp);
describe('Login', function () {
    beforeEach(function (done) {
        done();
    });

    afterEach(function (done) {
        // error handling
        done();
    });

    it('should return error:missing email or password', function (done) {
        chai.request(server)
            .post('/login')
            .send({})
            .end(function (err, res) {
                should.not.exist(err)
                should.exist(res)
                res.should.be.an('object')
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.keys('error')
                res.body["error"].should.equal('missing email or password');
                done();
            });
    });

    it('should return error:missing email or password', function (done) {
        chai.request(server)
            .post('/login')
            .send({ email: 'alex@gmail.com' })
            .end(function (err, res) {
                should.not.exist(err)
                should.exist(res)
                res.should.be.an('object')
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.keys('error')
                res.body["error"].should.equal('missing email or password');
                done();
            });
    });

    it('should return error:expected email to be string', function (done) {
        chai.request(server)
            .post('/login')
            .send({ email: { email: 123 }, password: '123' })
            .end(function (err, res) {
                should.not.exist(err)
                should.exist(res)
                res.should.be.an('object')
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.keys('error')
                res.body["error"].should.equal('mongodb Error');
                done();
            });
    });


    it('should return error:expected password to be string', function (done) {
        chai.request(server)
            .post('/login')
            .send({ email: "Dagostal77@gmail.com", password: 123 })
            .end(function (err, res) {
                should.not.exist(err)
                should.exist(res)
                res.should.be.an('object')
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.keys('error')
                res.body["error"].should.equal('expected password to be string');
                done();
            });
    });


    it('should return error:no user found', function (done) {
        chai.request(server)
            .post('/login')
            .send({ email: 'doesnotexist@gmail.com', password: "123" })
            .end(function (err, res) {
                should.not.exist(err)
                should.exist(res)
                res.should.be.an('object')
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.keys('error')
                res.body["error"].should.equal('no user found');
                done();
            });
    });

    it('should return error:wrong password', function (done) {
        chai.request(server)
            .post('/login')
            .send({ email: 'Dagostal77@gmail.com', password: "123645645" })
            .end(function (err, res) {
                should.not.exist(err)
                should.exist(res)
                res.should.be.an('object')
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.keys('error')
                res.body["error"].should.equal('wrong password');
                done();
            });
    });
    it('should return user id and email', function (done) {
        chai.request(server)
            .post('/login')
            .send({ email: 'Dagostal77@gmail.com', password: "123" })
            .end(function (err, res) {
                should.not.exist(err)
                should.exist(res)
                res.should.be.an('object')
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.keys('id', 'email')
                res.body["id"].should.equal('5fe16c9a0498030017b59d84');
                res.body["email"].should.equal('Dagostal77@gmail.com');
                done();
            });
    });
});