const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
const expect = chai.expect;

// Import sendbird
const { createUser, createChannel } = require('../SendBird/sendbird.js');

// use chaiHttp for making the actual HTTP requests   
chai.use(chaiHttp);
describe('SendBird Create User', function () {

    beforeEach(function (done) {
        done();
    });

    afterEach(function (done) {
        // error handling
        done();
    });

    it('should return an error: user id and name must be required', async () => {
        try {
            await createUser()
        } catch (e) {
            expect(e).to.be.instanceOf(Error)
            expect(e.message).to.eql('userid and name required')
        }
    });

    it('should return an error: user id must be unique', async () => {
        try {
            await createUser("a", "a")
        } catch (e) {
            expect(e).to.be.instanceOf(Error)
            expect(e.message).to.eql('Error: "user_id" violates unique constraint.')
        }
    });

    it('should return a sendBird User', function (done) {
        const randomNumber = Math.floor(Math.random() * Math.floor(10000));
        const userId = randomNumber
        const name = randomNumber
        createUser(userId, name)
            .then((user) => {
                user.should.be.an('object')
                user.should.have.keys('userId', 'nickname', 'isCreated')
                user['isCreated'].should.be.a('boolean')
                user['isCreated'].should.equal(true)
                done()
            })
            .catch(err => {
                //fail
                console.log(err);
                done(err)
            })
    });
});


describe('SendBird Create Channel', function () {
    beforeEach(function (done) {
        done();
    });

    afterEach(function (done) {
        // error handling
        done();
    });

    it('should return an error: userid or Care Provider', async () => {
        try {
            await createChannel()
        } catch (e) {
            expect(e).to.be.instanceOf(Error)
            expect(e.message).to.eql('no userId or Care Provider')
        }
    });

    it('should return an error channel already exists', async () => {
        try {
            await createChannel("Dagostal77@gmail.com", "DrA")
        } catch (e) {
            expect(e).to.be.instanceOf(Error)
            expect(e.message).to.eql('Error: error creating channel')
        }
    });

});