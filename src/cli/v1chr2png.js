const process = require('process')

const fs = require('fs')
const createVerge1PalLoader = require('../loader/createVerge1PalLoader')
const createVerge1ChrConverter = require('../converter/createVerge1ChrConverter')
const asset = require('../asset')

const palFilename = process.argv[2]
const chrFilename = process.argv[3]

const diskPalData = fs.readFileSync(palFilename)
const palLoader = createVerge1PalLoader({data: diskPalData})
const palData = palLoader.load()

const chrData = asset.fromDisk(chrFilename, asset.v1chr)
const chrConverter = createVerge1ChrConverter({
  palette: palData.pal,
  chrs: chrData.chrs,
})

const png = chrConverter.convertToPng()
const targetFilename = chrFilename + '.png'

png.pack().pipe(fs.createWriteStream(targetFilename))

console.log('converted', chrFilename, 'to', targetFilename)
