# Learnings

- The `jquery-ui` npm package sucks. If you want jQuery UI in Node, directly package it.
- Easiest to convert all image formats to 32-bit and operate exclusively on that internally.
- `putImageData` carries alpha but [always overwrites the destination](http://weblogs.asp.net/bleroy/drawing-transparent-glyphs-on-the-html-canvas). `drawImage` is what you want