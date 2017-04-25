let should = require('chai').should();
let footinch = require('../index');
let parse = footinch.parse;

describe('#parse', function() {
  it('Parses: 5', function() {
    parse('5').should.equal(5)
  });
  it('Parses: 5 1 1/2', function() {
    parse('5 1 1/2').should.equal(5 + (1+1/2)/12)
  });
  it('Parses: 5 1/2', function() {
    parse('5 1/2').should.equal(5 + .5/12)
  });
  it('Parses: 5 1/2"', function() {
    parse('5 1/2"').should.equal((5 + .5)/12)
  });
});
