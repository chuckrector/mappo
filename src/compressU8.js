"use strict"

/*

NOTE

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
    while (samect < 254 && i < src.length && byt === src[i]) {
      samect++
      i++
    }
    if (samect === 2 && byt !== 0xff) {
      dest.push(byt)
    }
    if (samect === 3 && byt !== 0xff) {
      dest.push(byt)
      dest.push(byt)
    }
    if (samect > 3 || byt === 0xff) {
      dest.push(0xff)
      dest.push(samect)
    }
    dest.push(byt)
  } while (i < src.length)

  return dest
}