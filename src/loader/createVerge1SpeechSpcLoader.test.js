"use strict"

console.log('running tests:', __filename)

const expect = require('expect')
const createVerge1SpeechSpcLoader = require('./createVerge1SpeechSpcLoader')
const fill = require('lodash/fill')

const tileWidth = 32
const tileHeight = 32
const numtiles = 11
const speech = fill(Array(tileWidth * tileHeight * numtiles), 99)

{
  // can read SPEECH.SPC
  const loader = createVerge1SpeechSpcLoader({
    data: Buffer.concat([
      Buffer.from([11]),
      Buffer.from(speech)
    ])
  })

  const data = loader.load()

  expect(data.numtiles).toEqual(11)
  expect(data.speech).toEqual(speech)
}