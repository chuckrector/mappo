const process = require(`process`)

const fs = require(`fs`)
const colorDepth = require(`../converter/colorDepth`)
const ripTiles = require(`../ripTiles`)
const {PNG} = require(`pngJS`)
const asset = require(`../asset`)

const palFilename = process.argv[2]
const chrFilename = process.argv[3]

const palData = asset.fromDisk(palFilename, asset.v1pal)
const chrData = asset.fromDisk(chrFilename, asset.v2chr)

const raw32BitData = colorDepth.convert8to32({
  palette: palData.pal.map(v => v * 4),
  raw8bitData: chrData.imagedata.decompressed,
})

const tileWidth = chrData.fxsize
const tileHeight = chrData.fysize
const tileList = ripTiles({
  raw32BitData,
  raw32BitDataWidth: tileWidth,
  raw32BitDataHeight: tileHeight * chrData.totalframes,
  ripFromX: 0,
  ripFromY: 0,
  tileWidth: tileWidth,
  tileHeight: tileHeight,
  numTiles: chrData.totalframes,
  numColumns: 1,
})

console.log(`converting`, chrFilename)
tileList.forEach((tile, tileIndex) => {
  const targetFilename = chrFilename + `-` + tileIndex + `.png`
  const png = new PNG({width: tileWidth, height: tileHeight})
  for (let p = 0; p < tileWidth * tileHeight * 4; p++) {
    png.data[p] = tile[p]
  }
  png.pack().pipe(fs.createWriteStream(targetFilename))
  console.log(`generated`, targetFilename)
})
