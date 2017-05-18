let should = require('chai').should();
let footinch = require('../index');
// let parseF = footinch.parseF;
// let parseM = footinch.parseM;

const allCases = {
  casesF : {
    '1'             : 1,
    '5 1 1/2'       : 5 + (1+1/2)/12,
    '5\' 1 1/2"'    : 5 + (1+1/2)/12,
    '5 1/2'         : 5 + 1/2/12,
    '5\' 1/2"'      : 5 + 1/2/12,
    '5 1/2"'        : (5+1/2)/12,
    '5-6'           : 5+6/12,
    '2 - 8'         : 2 + 8/12,
    '2-'            : NaN,
    '1m'            : 1/footinch.METERS_PER_FOOT,
    ' - 1 m '       : -1/footinch.METERS_PER_FOOT,
    ' - .01e5 mm '  : -1/footinch.METERS_PER_FOOT,
    '1000e-2\' 6"'  : 10 + 6/12,
    '1000e-2 - 6'   : 10 + 6/12,
    '.1e2 ft 6 in'  : 10 + 6/12,
    '- .1e+2 ft 6 in'  : -1*(10 + 6/12),
    '3 6.5'         : 3 + 6.5/12,
    '-3 6.5'        : -1*(3 + 6.5/12),
    '2\' 3.5"'      : 2 + 3.5/12,
    '3 6.'          : 3 + 6/12,
    '1 "'           : NaN
  },
  casesM : {
    '1'             : footinch.METERS_PER_FOOT,
    '1m'            : 1,
    ' - 1 km'       : -1000,
    ' + 1e3 mm'     : 1,
    '1e+2cm'        : 1,
    '1e2 qm'        : NaN
  }
}

const fmArr = ['F', 'M'];

for (let ii in fmArr) {
  const ltr = fmArr[ii];
  const cases = allCases['cases'+ltr];
  const parseFn = footinch.parse[ltr];

  describe('#parse.'+ltr, function() {
    Object.keys(cases).forEach(function(key) {
      let data = cases[key];
      it(key + ' --> ' + data, function() {
        if (isNaN(data)){
          parseFn(key).should.be.NaN;
        }
        else {
          parseFn(key).should.equal(data);
        }
      });
    });
  });
}
