"use strict"

const assert = require('assert')

const convert8to32 = ({palette, raw8bitData}) => {
  const raw32bitData = []

  let L = raw8bitData.length
  let offset8 = 0
  let offset32 = 0

  while (L-- > 0) {
    raw32bitData[offset32 + 0] = palette[raw8bitData[offset8] * 3 + 0]
    raw32bitData[offset32 + 1] = palette[raw8bitData[offset8] * 3 + 1]
    raw32bitData[offset32 + 2] = palette[raw8bitData[offset8] * 3 + 2]
    raw32bitData[offset32 + 3] = (offset8 > 0) ? 0xff : 0

    offset8++
    offset32 += 4
  }

  return raw32bitData
}

const convert24to32 = ({raw24bitData}) => {
  const raw32bitData = []

  assert.equal(raw24bitData.length % 3, 0, 'expected raw 24-bit data length to be divisible by three but got ' + raw24bitData.length)

  let L = Math.floor(raw24bitData.length / 3)
  let offset24 = 0
  let offset32 = 0

  while (L-- > 0) {
    const r = raw24bitData[offset24 + 0]
    const g = raw24bitData[offset24 + 1]
    const b = raw24bitData[offset24 + 2]
    const rgb = (r << 16) | (g << 8) | b

    raw32bitData[offset32 + 0] = r
    raw32bitData[offset32 + 1] = g
    raw32bitData[offset32 + 2] = b
    raw32bitData[offset32 + 3] = (rgb !== 0xff00ff) ? 0xff : 0

    offset24 += 3
    offset32 += 4
  }

  return raw32bitData
}

module.exports = {
  convert8to32,
  convert24to32,
}