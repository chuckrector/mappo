const process = require('process')

const fs = require('fs')
const createVerge1BoxRawLoader = require('../loader/createVerge1BoxRawLoader')
const createVerge1BoxRawConverter = require('../converter/createVerge1BoxRawConverter')
const asset = require('../asset')

const palFilename = process.argv[2]
const boxRawFilename = process.argv[3]

const palData = asset.fromDisk(palFilename, asset.v1pal)

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
