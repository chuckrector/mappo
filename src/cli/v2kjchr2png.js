"use strict"

const process = require(`process`)

const fs = require(`fs`)
const createVerge2kjChrConverter = require(`../converter/createVerge2kjChrConverter`)
const asset = require(`../asset`)

const chrFilename = process.argv[2]

const chrData = asset.fromDisk(chrFilename, asset.v2kjchr)
const chrConverter = createVerge2kjChrConverter({
  frameWidth: chrData.frameWidth,
  frameHeight: chrData.frameHeight,
  totalframes: chrData.totalframes,
  imagedata: chrData.imagedata.decompressed,
})

const png = chrConverter.convertToPng()
const targetFilename = chrFilename + `.png`

png.pack().pipe(fs.createWriteStream(targetFilename))

console.log(`converted`, chrFilename, `to`, targetFilename)
