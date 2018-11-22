# Summary
The primary purpose of this package is to allow one to parse Imperial lengths, e.g. a string like `5' 10 1/4"`. While we are at it, we also allow Metric input, such as `155 cm`.

Of lesser value is the formatter, which does the opposite - produce a string from a length number.

This is an `npm` package, but its components are written so that they can be directly included into a web page.

# Getting started

## Install the package:
```
npm install footinch --save
```
## Include in `node.js`
The whole thing:
```
let footinch = require('footinch'), parse = footinch.parse, format = footinch.format;
```
Or just piece that you need:
```
let parse = require('footinch/parse');
```
or
```
let format = require('footinch/format');
```

## Include in a web page:
```
<script src="../lib/parse.js"></script>
<script src="../lib/format.js"></script>
```
Well, you need to use the proper path, of course.

## Usage

Best of all, look at the demo files in the `misc/` folder.

To parse some user-input:
```
let str = "3 2 1/4"; // from some user-input
...
let numF = parse.F(str);  // Result in feet
let numM = parse.M(str);  // Result in meters
```
If parsing fails, each of the two methods return 'NaN'.

To format a length to a string:
```
const formatter1 = format.FT.to.FT.IN.FRAC(8); // Will format to feet and fractional inches, to the nearest 1/8"
const formatter2 = format.FT.to.FT.IN.FRAC(32, [' ft ', ' in']); // Format to 1/32, adding custom unit sufixes
...
formatter1(12.260416666666666); // Produces: 12' 3 1/8"
formatter2(12.260416666666666); // Produces: 12 ft 3 1/8 in
```
Naturally, one can do the whole formatting in a single expression, if the formatter is not going to be reused:
```
format.FT.to.FT.IN.DEC(3)(12 + 2.12345/12)
```

## Quick live demo

Open the file `./misc/demo-html.html` in a browser and mess around!
