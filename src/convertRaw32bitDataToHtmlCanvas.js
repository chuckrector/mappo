"use strict"

// putImageData() overwrites the destination, effectively ignoring alpha:
// http://weblogs.asp.net/bleroy/drawing-transparent-glyphs-on-the-html-canvas
//
// drawImage() respects alpha, so xfer raw data to a canvas. don't want the
// overhead of base64 encoding for an Image().

module.exports = ({
  document,
  raw32bitData,
  width,
  height,
  numTiles,
}) => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const imageData = context.createImageData(width, height * numTiles)

  imageData.data.set(raw32bitData)

  canvas.width = width
  canvas.height = width * numTiles

  context.putImageData(imageData, 0, 0)

  return canvas
}