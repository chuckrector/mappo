const process = require('process')

const fs = require('fs')
const createVerge3ChrLoader = require('../loader/createVerge3ChrLoader')
const createVerge3ChrConverter = require('../converter/createVerge3ChrConverter')

const chrFilename = process.argv[2]

const diskChrData = fs.readFileSync(chrFilename)
const chrLoader = createVerge3ChrLoader({data: diskChrData})
const chrData = chrLoader.load()
const chrConverter = createVerge3ChrConverter({
  bpp: chrData.bpp,
  fxsize: chrData.fxsize,
  fysize: chrData.fysize,
  totalframes: chrData.totalframes,
  imagedata: chrData.imagedata.decompressed,
})

const png = chrConverter.convertToPng()
const targetFilename = chrFilename + '.png'

png.pack().pipe(fs.createWriteStream(targetFilename))

console.log('converted', chrFilename, 'to', targetFilename)
