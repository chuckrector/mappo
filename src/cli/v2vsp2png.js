"use strict"

const process = require(`process`)

const fs = require(`fs`)
const createVerge2VspConverter = require(`../converter/createVerge2VspConverter`)
const asset = require(`../asset`)

const vspFilename = process.argv[2]
const vsp = asset.fromDisk(vspFilename, asset.v2vsp)
const converter = createVerge2VspConverter({
  palette: vsp.palette,
  numtiles: vsp.numtiles,
  frames: vsp.frames.decompressed,
})
const png = converter.convertToPng()
const targetFilename = vspFilename + `.png`

png.pack().pipe(fs.createWriteStream(targetFilename))

console.log(`converted`, vspFilename, `to`, targetFilename)
