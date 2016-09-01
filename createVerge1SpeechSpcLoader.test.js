"use strict"

const expect = require('expect')
const createVerge1SpeechSpcLoader = require('./createVerge1SpeechSpcLoader')
const fill = require('lodash/fill')

const tileWidth = 32
const tileHeight = 32
const speech = fill(Array(tileWidth * tileHeight), 99)

{
  // can read SPEECH.SPC
  const loader = createVerge1SpeechSpcLoader({
    data: Buffer.from(speech)
  })

  const data = loader.load()

  expect(data.speech).toEqual(speech)
}