'use strict';

const chai =  require('chai');
const expect = chai.expect;

const magicStringHelper = require('../../utils/helper');

describe.only('Count occurance of magicString', () => {
	before(done => {
		done();
	});
	beforeEach(done => {
		done();
	});
	describe('Login with credentials', () => {
		it('should return 2 as a output', done => {
            const input = 'Happy new year 2020. Wish you all a healthy year ahead '
            const magicString = 'year'
            const count = magicStringHelper.countOccurrences(input, magicString);
            expect(count).to.equal(2);
            done();
		});
	});
	after(done => {
		done();
	});
	afterEach(done => {
		done();
	});
});
