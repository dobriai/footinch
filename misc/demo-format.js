// Quick demo:
// OPTION A - get everything:
let footinch = require('../index'), format = footinch.format;
//
// OPTION B - get only the parser:
// let format = require('../lib/format');

let xx = format.FT.to.FT.DEC(2); // eslint-disable-line no-unused-vars
[
  "xx(12.123456)",
  "format.FT.to.FT.IN.DEC(3)(12 + 2.12345/12)",
  "format.FT.to.FT.IN.FRAC(8)(12 + (2 + 5/8)/12)",
  "format.FT.to.FT.IN.FRAC(8)(12 + (2 + 21/32)/12)",
  "format.FT.to.FT.IN.FRAC(8)(12 + (2 + 22/32)/12)",
  "format.FT.to.FT.IN.FRAC(8)(12 + (2 + 23/32)/12)",
  "format.FT.to.FT.IN.FRAC(8)(-1*(12 + (2 + 23/32)/12))",
  "format.FT.to.FT.IN.FRAC(8, [' ft ', ' in'])(-1*(12 + (2 + 23/32)/12))",
  "format.FT.to.FT.IN.DEC(3)(+0.999999)",
  "format.FT.to.FT.IN.DEC(5)(+9.999999)",
  "format.FT.to.FT.IN.DEC(5)(-9.9999999)"
].forEach(function (str) {
  console.log(str + " --> " + eval(str));
});
