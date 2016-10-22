"use strict"

const process = require(`process`)

const fs = require(`fs`)
const createVerge1Cr2Converter = require(`../converter/createVerge1Cr2Converter`)
const asset = require(`../asset`)

const palFilename = process.argv[2]
const cr2Filename = process.argv[3]

const palData = asset.fromDisk(palFilename, asset.v1pal)
const cr2Data = asset.fromDisk(cr2Filename, asset.v1cr2)
const cr2Converter = createVerge1Cr2Converter({
  palette: palData.pal,
  images: cr2Data.images,
})

const png = cr2Converter.convertToPng()
const targetFilename = cr2Filename + `.png`

png.pack().pipe(fs.createWriteStream(targetFilename))

console.log(`converted`, cr2Filename, `to`, targetFilename)
