;(function() {
  /* jshint node:true, asi:true, eqnull:true */
  "use strict";
  const root            = this;
  const previous_format = root.format;

  const METERS_PER_FOOT = 0.3048;

  const format = Object.create(null, {
    FEET    : { get: function() { return _forward(METERS_PER_FOOT); }, enumerable: true },
    FT      : { get: function() { return _forward(METERS_PER_FOOT); }, enumerable: true },
    F       : { get: function() { return _forward(METERS_PER_FOOT); }, enumerable: true },
    METERS  : { get: function() { return _forward(1); }, enumerable: true },
    M       : { get: function() { return _forward(1); }, enumerable: true },
    KM      : { get: function() { return _forward(1e3); }, enumerable: true },
    CM      : { get: function() { return _forward(1e-2); }, enumerable: true },
  });

  function _forward(base) {
    return Object.create(null, {
      to    : { get: function() { return _fmtFrom(base); } },
      as    : { get: function() { return _fmtFrom(base); } }
    });
  }
  function _fmtFrom(base) {
    return Object.create(null, {
      M     : { get : function() { return _fmtToM(base); } },
      METERS: { get : function() { return _fmtToM(base); } },
      KM    : { get : function() { return _fmtToKM(base); } },
      CM    : { get : function() { return _fmtToCM(base); } },
      FEET  : { get : function() { return _fmtToFT(base); } },
      FT    : { get : function() { return _fmtToFT(base); } },
      F     : { get : function() { return _fmtToFT(base); } }
    });
  }
  function _fmtToFT(base) {
    return Object.assign(
      Object.create(null, {
        IN    : { get : function() { return _fmtToFT_IN(base); } },
        INCHES: { get : function() { return _fmtToFT_IN(base); } }
      }),
      {
        DEC     : function(digits, sfx=' ft') { return _fmtToFT_DEC(base, digits, sfx); },
        DECIMAL : function(digits, sfx=' ft') { return _fmtToFT_DEC(base, digits, sfx); }
      }
    );
  }
  function _sfxFTIN(sfx) {
    if (Array.isArray(sfx) && sfx.length == 2) {
      return sfx;
    }
    return ["' ", '"'];
  }
  function _fmtToFT_IN(base) {
    return {
      DEC       : function(digits, sfx=_sfxFTIN()) { return _fmtToFT_IN_DEC(base, digits, sfx); },
      DECIMAL   : function(digits, sfx=_sfxFTIN()) { return _fmtToFT_IN_DEC(base, digits, sfx); },
      FRAC      : function(denom, sfx=_sfxFTIN()) { return _fmtToFT_IN_FRAC(base, denom, sfx); },
      FRACTIONAL: function(denom, sfx=_sfxFTIN()) { return _fmtToFT_IN_FRAC(base, denom, sfx); }
    };
  }
  function _fmtToFT_DEC(base, digits, sfx) {
    return function (valueIn) {
      const val =  valueIn * (base / METERS_PER_FOOT);
      return val.toFixed(digits) + sfx;
    };
  }
  function _fmtToFT_IN_DEC(base, digits, sfx) {
    sfx = _sfxFTIN(sfx);
    return function (valueIn) {
      const val =  valueIn * (base / METERS_PER_FOOT);
      const feet = Math.trunc(val);
      const inches = 12 * (val - feet);
      return feet + sfx[0] + Math.abs(inches.toFixed(digits)) + sfx[1];
    };
  }
  function _fmtToFT_IN_FRAC(base, denom, sfx) {
    sfx = _sfxFTIN(sfx);
    if (!denom || !isFinite(denom) || denom < 1) {
      denom = 16;
    }
    return function (valueIn) {
      const val =  valueIn * (base / METERS_PER_FOOT);
      const feet = Math.trunc(val);
      const inches = 12 * (val - feet);
      const wholeInches = Math.trunc(inches);
      let numerator = Math.round(denom * (inches - wholeInches));
      if (numerator === 0) {
        return feet + sfx[0] + Math.abs(wholeInches) + sfx[1];
      }
      while (numerator % 2 === 0 && denom % 2 === 0) {
        numerator /= 2;
        denom /= 2;
      }
      return feet + sfx[0] + Math.abs(wholeInches) + ' ' + Math.abs(numerator) + '/' + denom + sfx[1];
    };
  }

  const toExport = format;

  // --- Node.js and Browser support shebang ---
  toExport.noConflict = function() {
    root.format = previous_format;
    return toExport;
  }
  if( typeof exports !== 'undefined' ) {
    if( typeof module !== 'undefined' && module.exports ) {
      exports = module.exports = toExport
    }
    exports.format = toExport
  }
  else {
    root.format = toExport
  }
}).call(this);
