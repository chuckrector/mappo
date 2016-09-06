"use strict"

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

module.exports = {
  convert8to32,
}