// Quick demo:
// OPTION A - get everything:
// let footinch = require('../index'), parse = footinch.parse;
//
// OPTION B - get only the parser:
let parse = require('../lib/parse');

['1', '1\'', '1"', '1m', '1-1/2', '1 1/2', '.01e2', '-1e-3km', '3 6.5', '2\' 3.5"', '3 6.'].forEach(str => {
  let numF = parse.F(str);
  let numM = parse.M(str);
  console.log(str + " --> " + numF + ' feet = ' + numM + ' meters');
});
