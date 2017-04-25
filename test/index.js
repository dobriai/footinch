let should = require('chai').should();
let footinch = require('../index');
let parse = footinch.parse;

const cases = {
  '1'             : 1,
  '5 1 1/2'       : 5 + (1+1/2)/12,
  '5 1/2'         : 5 + 1/2/12,
  '5 1/2"'        : (5+1/2)/12,
  // '5-6'           : 5+6/12,
  '1 "'           : NaN
}

describe('#parse', function() {
  Object.keys(cases).forEach(function(key) {
    let data = cases[key];
    it(key + ' --> ' + data, function() {
      if (isNaN(data)){
        parse(key).should.be.NaN;
      }
      else {
        parse(key).should.equal(data);
      }
    });
  });
});
