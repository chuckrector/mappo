const process = require('process')

const fs = require('fs')
const createVerge1PalLoader = require('../loader/createVerge1PalLoader')
const createVerge1Cr2Loader = require('../loader/createVerge1Cr2Loader')
const createVerge1Cr2Converter = require('../converter/createVerge1Cr2Converter')

const palFilename = process.argv[2]
const cr2Filename = process.argv[3]

const diskPalData = fs.readFileSync(palFilename)
const palLoader = createVerge1PalLoader({data: diskPalData})
const palData = palLoader.load()

const diskCr2Data = fs.readFileSync(cr2Filename)
const cr2Loader = createVerge1Cr2Loader({data: diskCr2Data})
const cr2Data = cr2Loader.load()
const cr2Converter = createVerge1Cr2Converter({
  palette: palData.pal,
  chr2: cr2Data.chr2,
})

const png = cr2Converter.convertToPng()
const targetFilename = cr2Filename + '.png'

png.pack().pipe(fs.createWriteStream(targetFilename))

console.log('converted', cr2Filename, 'to', targetFilename)
