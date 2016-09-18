"use strict"

const assert = require('assert')

const convert8to32 = ({palette, raw8bitData}) => {
  const raw32bitData = []

  let L = raw8bitData.length
  let offset8 = 0
  let offset32 = 0

  while (L-- > 0) {
    const colorIndex = raw8bitData[offset8]
    raw32bitData[offset32 + 0] = palette[colorIndex * 3 + 0]
    raw32bitData[offset32 + 1] = palette[colorIndex * 3 + 1]
    raw32bitData[offset32 + 2] = palette[colorIndex * 3 + 2]
    raw32bitData[offset32 + 3] = (colorIndex > 0) ? 0xff : 0

    offset8++
    offset32 += 4
  }

  return raw32bitData
}

// math lifted from http://stackoverflow.com/questions/38557734/how-to-convert-16-bit-hex-color-to-rgb888-values-in-c
// note: this currently assumes v2kj convention of 0,0,0 as transparent
const convert16to32 = ({raw16bitData}) => {
  const raw32bitData = []

  let L = raw16bitData.length
  let offset = 0
  let offset32 = 0

  while (L-- > 0) {
    const rgb = raw16bitData[offset++]
    const r = (rgb & 0xf800) >> 8
    const g = (rgb & 0x07e0) >> 3
    const b = (rgb & 0x1f) << 3

    raw32bitData[offset32 + 0] = r
    raw32bitData[offset32 + 1] = g
    raw32bitData[offset32 + 2] = b
    raw32bitData[offset32 + 3] = rgb ? 0xff : 0

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
  convert16to32,
  convert24to32,
}