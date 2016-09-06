const process = require('process')

const fs = require('fs')
const createVerge1PalLoader = require('../loader/createVerge1PalLoader')
const createVerge1BoxRawLoader = require('../loader/createVerge1BoxRawLoader')
const createVerge1BoxRawConverter = require('../converter/createVerge1BoxRawConverter')

const palFilename = process.argv[2]
const boxRawFilename = process.argv[3]

const diskPalData = fs.readFileSync(palFilename)
const palLoader = createVerge1PalLoader({data: diskPalData})
const palData = palLoader.load()

const diskBoxRawData = fs.readFileSync(boxRawFilename)
const boxRawLoader = createVerge1BoxRawLoader({data: diskBoxRawData})
const boxRawData = boxRawLoader.load()
const boxRawConverter = createVerge1BoxRawConverter({
  palette: palData.pal,
  tbox: boxRawData.tbox,
})

const png = boxRawConverter.convertToPng()
const targetFilename = boxRawFilename + '.png'

png.pack().pipe(fs.createWriteStream(targetFilename))

console.log('converted', boxRawFilename, 'to', targetFilename)
