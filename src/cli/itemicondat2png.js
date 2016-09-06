const process = require('process')

const fs = require('fs')
const createVerge1PalLoader = require('../loader/createVerge1PalLoader')
const createVerge1ItemIconDatLoader = require('../loader/createVerge1ItemIconDatLoader')
const createVerge1ItemIconDatConverter = require('../converter/createVerge1ItemIconDatConverter')

const palFilename = process.argv[2]
const itemIconDatFilename = process.argv[3]

const diskPalData = fs.readFileSync(palFilename)
const palLoader = createVerge1PalLoader({data: diskPalData})
const palData = palLoader.load()

const diskItemIconDatData = fs.readFileSync(itemIconDatFilename)
const itemIconDatLoader = createVerge1ItemIconDatLoader({data: diskItemIconDatData})
const itemIconDatData = itemIconDatLoader.load()
const itemIconDatConverter = createVerge1ItemIconDatConverter({
  palette: palData.pal,
  numtiles: itemIconDatData.numtiles,
  itemicons: itemIconDatData.itemicons,
})

const png = itemIconDatConverter.convertToPng()
const targetFilename = itemIconDatFilename + '.png'

png.pack().pipe(fs.createWriteStream(targetFilename))

console.log('converted', itemIconDatFilename, 'to', targetFilename)
