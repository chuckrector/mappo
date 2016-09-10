const process = require('process')

const fs = require('fs')
const createVerge1PalLoader = require('../loader/createVerge1PalLoader')
const createVerge1MiscIconDatLoader = require('../loader/createVerge1MiscIconDatLoader')
const createVerge1MiscIconDatConverter = require('../converter/createVerge1MiscIconDatConverter')

const palFilename = process.argv[2]
const miscIconDatFilename = process.argv[3]

const diskPalData = fs.readFileSync(palFilename)
const palLoader = createVerge1PalLoader({data: diskPalData})
const palData = palLoader.load()

const diskMiscIconDatData = fs.readFileSync(miscIconDatFilename)
const miscIconDatLoader = createVerge1MiscIconDatLoader({data: diskMiscIconDatData})
const miscIconDatData = miscIconDatLoader.load()
const miscIconDatConverter = createVerge1MiscIconDatConverter({
  palette: palData.pal,
  numtiles: miscIconDatData.numtiles,
  menuptr: miscIconDatData.menuptr,
  itmptr: miscIconDatData.itmptr,
  charptr: miscIconDatData.charptr,
})

const png = miscIconDatConverter.convertToPng()
const targetFilename = miscIconDatFilename + '.png'

png.pack().pipe(fs.createWriteStream(targetFilename))

console.log('converted', miscIconDatFilename, 'to', targetFilename)
