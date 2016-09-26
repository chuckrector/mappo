"use strict"

const process = require(`process`)

const fs = require(`fs`)
const createVerge1MainFntConverter = require(`../converter/createVerge1MainFntConverter`)
const asset = require(`../asset`)

const palFilename = process.argv[2]
const mainFntFilename = process.argv[3]

const palData = asset.fromDisk(palFilename, asset.v1pal)
const mainFntData = asset.fromDisk(mainFntFilename, asset.v1mainfnt)
const mainFntConverter = createVerge1MainFntConverter({
  palette: palData.pal,
  fnt2: mainFntData.fnt2,
})

const png = mainFntConverter.convertToPng()
const targetFilename = mainFntFilename + `.png`

png.pack().pipe(fs.createWriteStream(targetFilename))

console.log(`converted`, mainFntFilename, `to`, targetFilename)
