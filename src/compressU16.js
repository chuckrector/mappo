"use strict"

/*

NOTE

Performs simple arithmetic. Little-endian is implicit. Pass results
to a Uint16Array for disk ops; dest.length * 2 == # bytes on disk

Implicitly tested by makeBuffer.test.js

*/

module.exports = (src) => {
  const dest = []

  let i = 0
  let byt
  let samect
  let repcode

  do {
    byt = src[i++]
    samect = 1
    while (samect < 255 && i < src.length && byt === src[i]) {
      samect++
      i++
    }
    if (samect > 1 || ((byt & 0xff00) === 0xff00)) {
      dest.push(samect | 0xff00)
    }
    dest.push(byt)
  } while (i < src.length)

  return dest
}
