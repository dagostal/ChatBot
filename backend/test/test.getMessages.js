const chai = require('chai');
const chaiHttp = require('chai-http');
const e = require('express');

const should = chai.should();

// Import server
var server = require('../index.js');
const { getMessageBySender } = require("../messageQueries/findMessagesBySender")

const { expect } = require('chai');

describe('Get Messages by sender', function () {
    beforeEach(function (done) {
        done();
    });

    afterEach(function (done) {
        // error handling
        done();
    });

    it('should return message by sender', async () => {
        try {
            const messages = await getMessageBySender("Dagostal77@gmail.com")
            expect(messages).to.not.have.lengthOf(0)
        } catch (e) {
            expect(e).to.be.instanceOf(Error)
            expect(e.message).to.eql('userid and name required')
        }
    });
});