"use strict"

const expect = require(`expect`)
const createVerge1SmallFntConverter = require(`./createVerge1SmallFntConverter`)
const filler = require(`../filler`)
const palette = require(`../dummyPalette`)

{
  // can convert SMALL.FNT font to png
  const tileWidth = 7
  const tileHeight = 9
  const tileCount = 95
  const images = filler(tileWidth * tileHeight * tileCount)
  const converter = createVerge1SmallFntConverter({
    palette,
    images: Buffer.from(images)
  })

  const png = converter.convertToPng()

  // 19 * 5 == 95
  expect(png.width).toBe(tileWidth * 19)
  expect(png.height).toBe(tileHeight * 5)
}