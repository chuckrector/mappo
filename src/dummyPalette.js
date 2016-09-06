"use strict"

let palette = []
for (let i = 0; i < 256; i++) {
  palette.push(...[i, i, i])
}

palette[(1 * 3) + 0] = 255
palette[(1 * 3) + 1] = 0
palette[(1 * 3) + 2] = 0

module.exports = palette