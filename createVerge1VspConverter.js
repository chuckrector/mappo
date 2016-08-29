"use strict"

const {PNG} = require('pngJS')

module.exports = ({palette, numtiles, vsp0}) => {
  const convert = () => {
    const columns = 20
    const width = columns * 16
    const height = Math.floor((numtiles + (columns - 1)) / columns) * 16
    const png = new PNG({width, height, filterType: -1})

    return png.pack()
  }

  return {
    convert
  }
}