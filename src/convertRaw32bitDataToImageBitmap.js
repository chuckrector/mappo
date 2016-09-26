"use strict"

// putImageData() overwrites the destination, effectively ignoring alpha:
// http://weblogs.asp.net/bleroy/drawing-transparent-glyphs-on-the-html-canvas
//
// drawImage() respects alpha, so xfer raw data to a format it accepts.
// 1. don't want base64 encoding overhead for constructing Image()
// 2. don't want blitting overhead for xfer to HTMLCanvasElement
// instead, use the awesome createImageBitmap!

module.exports = ({
  context,
  raw32bitData,
  width,
  height,
  numTiles, // TODO(chuck): should prolly rename this file to something tileset-specific
}) => {
  // TODO(chuck): not sure how i feel about this. appeasing createMappoTileset.test.js
  if (!context) {
    console.warn('WARNING: no context provided for convertRaw32bitDataToImageBitmap. NOT creating ImageBitmap')
    return
  }

  const imageData = context.createImageData(width, height * numTiles)

  imageData.data.set(raw32bitData)

  return createImageBitmap(imageData)
}