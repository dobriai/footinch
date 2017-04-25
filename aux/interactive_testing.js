// Run this thing from your favourite debugger, e.g. node-inspector
let footinch = require('../index');

let str = '1 7/8';
while (true) {
  let num = footinch.parse(str);
  console.log(str + " = " + num);
}
