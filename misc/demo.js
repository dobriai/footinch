// Quick demo:
let footinch = require('../index');

['1', '1\'', '1"', '1m', '1-1/2', '1 1/2', '.01e2', '-1e-3km'].forEach(str => {
  let numF = footinch.parse.F(str);
  let numM = footinch.parse.M(str);
  console.log(str + " --> " + numF + ' feet = ' + numM + ' meters');
});
