"use strict"

const process = require(`process`)

const fs = require(`fs`)
const createVerge3VspObConverter = require(`../converter/createVerge3VspObConverter`)
const filler = require(`../filler`)
const asset = require(`../asset`)

const vspFilename = process.argv[2]
const vsp = asset.fromDisk(vspFilename, asset.v3vsp)
const palette = filler(256 * 3, 128)
const converter = createVerge3VspObConverter({
  palette,
  obstructionCount: vsp.obstructionCount,
  obs: vsp.obs.decompressed,
})
const png = converter.convertToPng()
const targetFilename = vspFilename + `-obstructions.png`

png.pack().pipe(fs.createWriteStream(targetFilename))

console.log(`converted`, vspFilename, `to`, targetFilename)
