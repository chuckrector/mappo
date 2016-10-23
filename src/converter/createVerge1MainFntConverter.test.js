"use strict"

const expect = require(`expect`)
const createVerge1MainFntConverter = require(`./createVerge1MainFntConverter`)
const filler = require(`../filler`)
const palette = require(`../dummyPalette`)

{
  // can convert MAIN.FNT font to png
  const tileWidth = 9
  const tileHeight = 16
  const tileCount = 95
  const fnt2 = filler(tileWidth * tileHeight * tileCount)
  const converter = createVerge1MainFntConverter({
    palette,
    fnt2: Buffer.from(fnt2)
  })

  const png = converter.convertToPng()

  // 19 * 5 == 95
  expect(png.width).toBe(tileWidth * 19)
  expect(png.height).toBe(tileHeight * 5)
}