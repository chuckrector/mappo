"use strict"

const process = require(`process`)

const fs = require(`fs`)
const createVerge1BoxRawConverter = require(`../converter/createVerge1BoxRawConverter`)
const asset = require(`../asset`)

const palFilename = process.argv[2]
const boxRawFilename = process.argv[3]

const palData = asset.fromDisk(palFilename, asset.v1pal)
const boxRawData = asset.fromDisk(boxRawFilename, asset.v1boxraw)
const boxRawConverter = createVerge1BoxRawConverter({
  palette: palData.pal,
  tbox: boxRawData.tbox,
})

const png = boxRawConverter.convertToPng()
const targetFilename = boxRawFilename + `.png`

png.pack().pipe(fs.createWriteStream(targetFilename))

console.log(`converted`, boxRawFilename, `to`, targetFilename)
