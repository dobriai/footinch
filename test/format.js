/* let should = */ require('chai').should();
let footinch = require('../index'), format = footinch.format;

describe('#format:IMPERIAL', function () {
  // eslint-disable-next-line no-unused-vars
  let xx = format.FT.to.FT.DEC(2);
  const cases = {
    "xx(12.123456)" : "12.12 ft",
    "format.FT.to.FT.DEC(2, ' feet')(12.5)" : "12.50 feet",
    "format.FT.to.FT.IN.DEC(3)(12 + 2.12345/12)" : "12' 2.123\"",
    "format.FT.to.FT.IN.FRAC(8)(12 + (2 + 5/8)/12)" : "12' 2 5/8\"",
    "format.FT.to.FT.IN.FRAC(8)(12 + (2 + 21/32)/12)" : "12' 2 5/8\"",
    "format.FT.to.FT.IN.FRAC(8)(12 + (2 + 22/32)/12)" : "12' 2 3/4\"",
    "format.FT.to.FT.IN.FRAC(8)(12 + (2 + 23/32)/12)" : "12' 2 3/4\"",
    "format.FT.to.FT.IN.FRAC(8)(-1*(12 + (2 + 23/32)/12))" : "-12' 2 3/4\"",
    "format.FT.to.FT.IN.FRAC(8, [' ft ', ' in'])(-1*(12 + (2 + 23/32)/12))" : "-12 ft 2 3/4 in"
  };

  Object.keys(cases).forEach(function (key) {
    // console.log(str + " --> " + eval(str));
    const data = cases[key];
    it(key + ' --> ' + data, function() {
      eval(key).should.equal(data);
    });
  });
});
