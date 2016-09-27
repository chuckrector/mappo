# Learnings

- The `jquery-ui` npm package sucks. If you want jQuery UI in Node, directly package it.
- Easiest to convert all image formats to 32-bit and operate exclusively on that internally.
- `putImageData` carries alpha but [always overwrites the destination](http://weblogs.asp.net/bleroy/drawing-transparent-glyphs-on-the-html-canvas). `drawImage` is what you want
- [NW.js](http://nwjs.io/) was a little easier to setup than [Electron](http://electron.atom.io/) for me, but has these downsides:
  - NW.js renders my maps perceptibly slower (I do lots of `drawImage()` from `ImageBitmap` source onto a `<canvas>`)
  - NW.js does not pipe `console.log` output from Node modules I've written into dev tools (deal-breaker)
  - NW.js debugger cannot step into Node modules I've written -- it steps over them (huge deal-breaker)
