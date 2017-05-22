// Run this thing from your favourite debugger, e.g. node-inspector
let footinch = require('../index');

let str = '1 7/8';
while (true) {  //eslint-disable-line no-constant-condition
  let num = footinch.parse.F(str);
  console.log(str + " = " + num);
}
