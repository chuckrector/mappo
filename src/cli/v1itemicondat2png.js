const process = require(`process`)

const fs = require(`fs`)
const createVerge1ItemIconDatConverter = require(`../converter/createVerge1ItemIconDatConverter`)
const asset = require(`../asset`)

const palFilename = process.argv[2]
const itemIconDatFilename = process.argv[3]

const palData = asset.fromDisk(palFilename, asset.v1pal)
const itemIconDatData = asset.fromDisk(itemIconDatFilename, asset.v1itemicondat)
const itemIconDatConverter = createVerge1ItemIconDatConverter({
  palette: palData.pal,
  numtiles: itemIconDatData.numtiles,
  itemicons: itemIconDatData.itemicons,
})

const png = itemIconDatConverter.convertToPng()
const targetFilename = itemIconDatFilename + `.png`

png.pack().pipe(fs.createWriteStream(targetFilename))

console.log(`converted`, itemIconDatFilename, `to`, targetFilename)
