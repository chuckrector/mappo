"use strict"

const expect = require(`expect`)
const createVerge1SpeechSpcConverter = require(`./createVerge1SpeechSpcConverter`)
const filler = require(`../filler`)
const palette = require(`../dummyPalette`)

{
  // can convert SPEECH.SPC character portrait to png
  const tileWidth = 32
  const tileHeight = 32
  const numtiles = 11
  const speech = filler(tileWidth * tileHeight * numtiles, 99)
  const converter = createVerge1SpeechSpcConverter({
    palette,
    numtiles,
    speech
  })

  const png = converter.convertToPng()

  expect(png.width).toBe(tileWidth * 10)
  expect(png.height).toBe(tileHeight * 2)
}