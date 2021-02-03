// eslint-disable-next-line no-extra-semi
;(function() {
  'use strict';
  const root            = this;
  const previous_parse  = root.parse;

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

  // ---------------------------------------------------------
  function _parse(strIn)
  {
    if (!strIn || typeof strIn !== 'string' ) {
      return NaN;
    }
    let str = strIn.trim();
    if (str.length == 0) {
      return NaN;
    }

    // Just look up the sign now and be done, rather than bother with leading zeros
    const sgn = str.startsWith('-') ? -1 : 1;

    // Try +-: 1/2", 11/16"; trailing space OK, but nothing else
    // Note: Trailing " is mandatory!
    {
      let lm = str.match(/^([+-]?\d+)\/(\d+)" *$/);
      if (lm) {
        return (parseFloat(lm[1]) / parseFloat(lm[2])) / 12.0 ;
      }
    }

    // Try +-: 5, 1.2e7, .1e+2, 3e-1, 3.e1
    let firstFloat = NaN;
    {
      let lm = str.match(/^[+-]? *(?:\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?/i);
      if (!lm) {
        return NaN;
      }
      firstFloat = parseFloat(lm[0].replace(/ */g, ''));  // Clear spaces on the way
      str = str.slice(lm[0].length);   // Don't trim just yet!
    }

    if (str.length == 0 || isNaN(firstFloat)) {
      return firstFloat;
    }

    // If inches, then end of story
    if (str.match(/^("| *in) *$/i)) {
      return firstFloat / 12.0;
    }
    {
      let lm = str.match(/^ +(\d+)\/(\d+)" *$/i);
      if (lm) {
        // If original input was: 7 11/16"
        return (firstFloat + sgn * parseFloat(lm[1]) / parseFloat(lm[2])) / 12.0;
      }
    }
    // Try explicit units
    {
      let lm = str.match(/^ *(m|cm|mm|um|nm|pm|km) *$/i);
      if (lm) {
        // Return an array to signal that the output is in METERS:
        return [firstFloat * s_siPrefix[lm[1]], true];
      }
    }

    // Should be feet now
    {
      let lm = str.match(/^(?:'| *ft|-| +-?) */i);   // Order matters here!
      if (!lm) {
        return NaN;
      }
      str = str.slice(lm[0].length).trim();
      if (str.length == 0) {
        if (lm[0].match(/-/)) {
          return NaN; // Trailing dash - e.g. strIn was: 7-
        }
        return firstFloat;
      }
    }

    // Now we can only have left: 2, 2.3, 7/8, 2 7/8, with an optional " at the end
    {
      let lm = str.match(/^(\d+(?:\.\d*)?)(?:"| *in)? *$/);
      if (lm) {
        return firstFloat + sgn * parseFloat(lm[1]) / 12.0 ;
      }
      lm = str.match(/^(\d+)\/(\d+)("| *in)? *$/);
      if (lm) {
        return firstFloat + sgn * (parseFloat(lm[1]) / parseFloat(lm[2])) / 12.0 ;
      }
      lm = str.match(/^(\d+) +(\d+)\/(\d+)("| *in)? *$/);
      if (lm) {
        return firstFloat + sgn * (parseFloat(lm[1]) + parseFloat(lm[2]) / parseFloat(lm[3])) / 12.0 ;
      }
    }

    return NaN;
  }

  // We are trying to avoid unnecessary round-trip conversions like meters->feet->meters,
  // in order to avoid machine epsilon noise, e.g. 1m parsing as 0.99999999999

  // Return length in FEET:
  function _parseF(strIn) {
    // let [num, inMeters] = _parse(strIn); --- This line crashes for some reason ... WHY???
    //                                      --- TypeError: _parse is not a function
    // if (inMeters === undefined) {
    //   return num;
    // }
    let num = _parse(strIn);
    if (typeof num === 'number') {
      return num;
    }
    return num[0] /  METERS_PER_FOOT;
  }

  // Return length in METERS:
  function _parseM(strIn) {
    let num = _parse(strIn);
    if (typeof num === 'number') {
      return num * METERS_PER_FOOT;
    }
    return num[0];
  }

  const toExport = {
    F         : _parseF,
    FEET      : _parseF,
    M         : _parseM,
    METERS    : _parseM,
  };

  toExport.METERS_PER_FOOT = METERS_PER_FOOT;

  // --- Node.js and Browser support shebang ---
  toExport.noConflict = function() {
    root.parse = previous_parse;
    return toExport;
  };
  if( typeof exports !== 'undefined' ) {
    if( typeof module !== 'undefined' && module.exports ) {
      exports = module.exports = toExport;
    }
    exports.parse = toExport;
  }
  else {
    root.parse = toExport;
  }
}).call(this);
