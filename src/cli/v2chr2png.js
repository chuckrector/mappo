const process = require(`process`)

const fs = require(`fs`)
const createVerge2ChrConverter = require(`../converter/createVerge2ChrConverter`)
const asset = require(`../asset`)

const palFilename = process.argv[2]
const chrFilename = process.argv[3]

const palData = asset.fromDisk(palFilename, asset.v1pal)
const chrData = asset.fromDisk(chrFilename, asset.v2chr)
const chrConverter = createVerge2ChrConverter({
  palette: palData.pal,
  fxsize: chrData.fxsize,
  fysize: chrData.fysize,
  totalframes: chrData.totalframes,
  imagedata: chrData.imagedata.decompressed,
})

const png = chrConverter.convertToPng()
const targetFilename = chrFilename + `.png`

png.pack().pipe(fs.createWriteStream(targetFilename))

console.log(`converted`, chrFilename, `to`, targetFilename)
