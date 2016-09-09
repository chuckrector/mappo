"use strict"

const expect = require('expect')
const createVerge1SpeechSpcLoader = require('./createVerge1SpeechSpcLoader')
const fill = require('lodash/fill')
const {makeBuffer, B} = require('../makeBuffer')

const tileWidth = 32
const tileHeight = 32
const numtiles = 11
const speech = fill(Array(tileWidth * tileHeight * numtiles), 99)

{
  // can read SPEECH.SPC
  const loader = createVerge1SpeechSpcLoader({
    data: makeBuffer([
      B.u8(11),
      B.u8(speech),
    ])
  })

  const data = loader.load()

  expect(data.numtiles).toEqual(11)
  expect(data.speech).toEqual(speech)
}