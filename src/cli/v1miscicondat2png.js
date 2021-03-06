"use strict"

const process = require(`process`)

const fs = require(`fs`)
const createVerge1MiscIconDatConverter = require(`../converter/createVerge1MiscIconDatConverter`)
const asset = require(`../asset`)

const palFilename = process.argv[2]
const miscIconDatFilename = process.argv[3]

const palData = asset.fromDisk(palFilename, asset.v1pal)
const miscIconDatData = asset.fromDisk(miscIconDatFilename, asset.v1miscicondat)
const miscIconDatConverter = createVerge1MiscIconDatConverter({
  palette: palData.palette,
  tileCount: miscIconDatData.tileCount,
  menuPointer: miscIconDatData.menuPointer,
  itemPointer: miscIconDatData.itemPointer,
  characterPointer: miscIconDatData.characterPointer,
})

const png = miscIconDatConverter.convertToPng()
const targetFilename = miscIconDatFilename + `.png`

png.pack().pipe(fs.createWriteStream(targetFilename))

console.log(`converted`, miscIconDatFilename, `to`, targetFilename)
