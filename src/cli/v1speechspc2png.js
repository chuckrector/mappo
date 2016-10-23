"use strict"

const process = require(`process`)

const fs = require(`fs`)
const createVerge1SpeechSpcConverter = require(`../converter/createVerge1SpeechSpcConverter`)
const asset = require(`../asset`)

const palFilename = process.argv[2]
const speechSpcFilename = process.argv[3]

const palData = asset.fromDisk(palFilename, asset.v1pal)
const speechSpcData = asset.fromDisk(speechSpcFilename, asset.v1speechspc)
const speechSpcConverter = createVerge1SpeechSpcConverter({
  palette: palData.palette,
  tileCount: speechSpcData.tileCount,
  speech: speechSpcData.speech,
})

const png = speechSpcConverter.convertToPng()
const targetFilename = speechSpcFilename + `.png`

png.pack().pipe(fs.createWriteStream(targetFilename))

console.log(`converted`, speechSpcFilename, `to`, targetFilename)
