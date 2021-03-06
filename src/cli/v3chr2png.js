"use strict"

const process = require(`process`)

const fs = require(`fs`)
const createVerge3ChrConverter = require(`../converter/createVerge3ChrConverter`)
const asset = require(`../asset`)

const chrFilename = process.argv[2]
const chrData = asset.fromDisk(chrFilename, asset.v3chr)
const chrConverter = createVerge3ChrConverter({
  bitsPerPixel: chrData.bitsPerPixel,
  frameWidth: chrData.frameWidth,
  frameHeight: chrData.frameHeight,
  frameCount: chrData.frameCount,
  frames: chrData.frames.decompressed,
})

const png = chrConverter.convertToPng()
const targetFilename = chrFilename + `.png`

png.pack().pipe(fs.createWriteStream(targetFilename))

console.log(`converted`, chrFilename, `to`, targetFilename)
