/* let should = */ require('chai').should();
let footinch = require('../index'), format = footinch.format;

describe('#format:IMPERIAL', function () {
  // eslint-disable-next-line no-unused-vars
  let xx = format.FT.to.FT.DEC(2);
  const cases = {
    "xx(12.123456)" : "12.12 ft",
    "format.FT.to.FT.DEC(3, ' feet')(12.5)" : "12.5 feet",
    "format.FT.to.FT.DEC(3, ' feet')(12.56789)" : "12.568 feet",
    "format.M.to.M(3, ' meters')(12.0)" : "12 meters",
    "format.M.to.M(3)(12.456789)" : "12.457 m",
    "format.FT.to.FT.IN.DEC(3)(12 + 2.12345/12)" : "12' 2.123\"",
    "format.FT.to.FT.IN.FRAC(8)(12 + (2 + 5/8)/12)" : "12' 2 5/8\"",
    "format.FT.to.FT.IN.FRAC(8)(12 + (2 + 21/32)/12)" : "12' 2 5/8\"",
    "format.FT.to.FT.IN.FRAC(8)(12 + (2 + 22/32)/12)" : "12' 2 3/4\"",
    "format.FT.to.FT.IN.FRAC(8)(12 + (2 + 23/32)/12)" : "12' 2 3/4\"",
    "format.FT.to.FT.IN.FRAC(8)(-1*(12 + (2 + 23/32)/12))" : "-12' 2 3/4\"",
    "format.FT.to.FT.IN.FRAC(8, [' ft ', ' in'])(-1*(12 + (2 + 23/32)/12))" : "-12 ft 2 3/4 in",
    "format.FT.to.FT.IN.DEC(5)(+9.9999996)" : "10' 0\"",
    "format.FT.to.FT.IN.DEC(5)(-9.9999996)" : "-10' 0\"",
    "format.FT.to.FT.IN.DEC(5)(+9.999999)" : "9' 11.99999\"",
    "format.FT.to.FT.IN.DEC(5)(-9.999999)" : "-9' 11.99999\"",
    "format.FT.to.FT.IN.DEC(5)(+0.9999996)" : "1' 0\"",
    "format.FT.to.FT.IN.DEC(5)(-0.9999996)" : "-1' 0\"",
  };

  Object.keys(cases).forEach(function (key) {
    // console.log(str + " --> " + eval(str));
    const data = cases[key];
    it(key + ' --> ' + data, function() {
      eval(key).should.equal(data);
    });
  });
});
