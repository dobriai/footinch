const s_siPrefix = {
  m  : 1,
  cm : 1e-2,
  mm : 1e-3,
  um : 1e-6,
  nm : 1e-9,
  pm : 1e-12,
  km : 1e+3
};

const METERS_PER_FOOT = 0.3048;

module.exports.parse = function (strIn)
{
  if (!strIn || typeof strIn !== 'string' ) {
    return NaN;
  }
  let str = strIn.trim();
  if (str.length == 0) {
    return NaN;
  }

  // Try +-: 1/2", 11/16"; trailing space OK, but nothing else
  // Note: Trailing " is mandatory!
  {
    let lm = str.match(/^([+-]?\d+)\/(\d+)\" *$/);
    if (lm) {
      return (parseFloat(lm[1]) / parseFloat(lm[2])) / 12.0 ;
    }
  }

  // Try +-: 5, 1.2e7, .1e+2, 3e-1, 3.e1
  let first = str.match(/^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?/i);
  if (!first) {
    return NaN;
  }
  let firstFloat = parseFloat(first[0]);

  str = str.slice(first[0].length);   // Don't trim just yet!

  if (str.length == 0) {
    return firstFloat;
  }

  // If inches, then end of story
  if (str.match(/^(\"| *in) *$/i)) {
    return firstFloat / 12.0;
  }
  {
    let lm = str.match(/^ +(\d+)\/(\d+)\" *$/i);
    if (lm) {
      // If original input was: 7 11/16"
      return (firstFloat + parseFloat(lm[1]) / parseFloat(lm[2])) / 12.0;
    }
  }
  // Try explicit units
  {
    let lm = str.match(/^ *(m|cm|mm|um|nm|pm|km) *$/i);
    if (lm) {
      return firstFloat * s_siPrefix[lm[1]] / METERS_PER_FOOT;
    }
  }

  // Should be feet now
  {
    let lm = str.match(/^(\'|-| +-?| *ft) */i);
    if (!lm) {
      return NaN;
    }
    str = str.slice(lm[0].length).trim();
  }
  if (str.length == 0) {
    return firstFloat;
  }

  // Now we can only have left: 2, 7/8, 2 7/8, with an optional " at the end
  {
    let lm = str.match(/^(\d+)\/(\d+)\"? *$/);
    if (lm) {
      return firstFloat + (parseFloat(lm[1]) / parseFloat(lm[2])) / 12.0 ;
    }
    lm = str.match(/^(\d+) +(\d+)\/(\d+)\"? *$/);
    if (lm) {
      return firstFloat + (parseFloat(lm[1]) + parseFloat(lm[2]) / parseFloat(lm[3])) / 12.0 ;
    }
  }

  return NaN;
}
