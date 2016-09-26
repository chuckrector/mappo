"use strict"

const process = require(`process`)

const fs = require(`fs`)
const createVerge1SmallFntConverter = require(`../converter/createVerge1SmallFntConverter`)
const asset = require(`../asset`)

const palFilename = process.argv[2]
const smallFntFilename = process.argv[3]

const palData = asset.fromDisk(palFilename, asset.v1pal)
const smallFntData = asset.fromDisk(smallFntFilename, asset.v1smallfnt)
const smallFntConverter = createVerge1SmallFntConverter({
  palette: palData.pal,
  fnt: smallFntData.fnt,
})

const png = smallFntConverter.convertToPng()
const targetFilename = smallFntFilename + `.png`

png.pack().pipe(fs.createWriteStream(targetFilename))

console.log(`converted`, smallFntFilename, `to`, targetFilename)
