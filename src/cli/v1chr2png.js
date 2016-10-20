"use strict"

const process = require(`process`)

const fs = require(`fs`)
const createVerge1ChrConverter = require(`../converter/createVerge1ChrConverter`)
const asset = require(`../asset`)

const palFilename = process.argv[2]
const chrFilename = process.argv[3]

const palData = asset.fromDisk(palFilename, asset.v1pal)
const chrData = asset.fromDisk(chrFilename, asset.v1chr)
const chrConverter = createVerge1ChrConverter({
  palette: palData.pal,
  frames: chrData.frames,
})

const png = chrConverter.convertToPng()
const targetFilename = chrFilename + `.png`

png.pack().pipe(fs.createWriteStream(targetFilename))

console.log(`converted`, chrFilename, `to`, targetFilename)
