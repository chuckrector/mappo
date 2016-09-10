const process = require('process')

const fs = require('fs')
const createVerge1PalLoader = require('../loader/createVerge1PalLoader')
const createVerge1ChrLoader = require('../loader/createVerge1ChrLoader')
const colorDepth = require('../converter/colorDepth')
const ripTiles = require('../ripTiles')
const {PNG} = require('pngJS')

const palFilename = process.argv[2]
const chrFilename = process.argv[3]

const diskPalData = fs.readFileSync(palFilename)
const palLoader = createVerge1PalLoader({data: diskPalData})
const palData = palLoader.load()

const diskChrData = fs.readFileSync(chrFilename)
const chrLoader = createVerge1ChrLoader({data: diskChrData})
const chrData = chrLoader.load()

const raw32BitData = colorDepth.convert8to32({
  palette: palData.pal.map(v => v * 4),
  raw8bitData: chrData.chrs,
})

const tileWidth = 16
const tileHeight = 32
const tileList = ripTiles({
  raw32BitData,
  raw32BitDataWidth: tileWidth,
  raw32BitDataHeight: tileHeight * 30,
  ripFromX: 0,
  ripFromY: 0,
  tileWidth: tileWidth,
  tileHeight: tileHeight,
  numTiles: 30,
  numColumns: 1,
})

console.log('converting', chrFilename)
tileList.forEach((tile, tileIndex) => {
  const targetFilename = chrFilename + '-' + tileIndex + '.png'
  const png = new PNG({width: tileWidth, height: tileHeight})
  for (let p = 0; p < tileWidth * tileHeight * 4; p++) {
    png.data[p] = tile[p]
  }
  png.pack().pipe(fs.createWriteStream(targetFilename))
  console.log('generated', targetFilename)
})
