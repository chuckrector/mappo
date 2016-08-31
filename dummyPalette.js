"use strict"

let palette = []
for (let i = 0; i < 256; i++) {
  const ii = Math.floor(i / 4)
  palette.push(...[ii, ii, ii])
}

palette[(1 * 3) + 0] = Math.floor(255 / 4)
palette[(1 * 3) + 1] = 0
palette[(1 * 3) + 2] = 0

module.exports = palette