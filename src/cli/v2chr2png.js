const process = require('process')

const fs = require('fs')
const createVerge1PalLoader = require('../loader/createVerge1PalLoader')
const createVerge2ChrLoader = require('../loader/createVerge2ChrLoader')
const createVerge2ChrConverter = require('../converter/createVerge2ChrConverter')

const palFilename = process.argv[2]
const chrFilename = process.argv[3]

fs.readFile(palFilename, (err, diskPalData) => {
  const palLoader = createVerge1PalLoader({data: diskPalData})
  const palData = palLoader.load()

  fs.readFile(chrFilename, (err, diskChrData) => {
    const chrLoader = createVerge2ChrLoader({data: diskChrData})
    const chrData = chrLoader.load()
    const chrConverter = createVerge2ChrConverter({
      palette: palData.pal,
      fxsize: chrData.fxsize,
      fysize: chrData.fysize,
      totalframes: chrData.totalframes,
      imagedata: chrData.imagedata.decompressed,
    })

    const png = chrConverter.convertToPng()
    const targetFilename = chrFilename + '.png'

    png.pack().pipe(fs.createWriteStream(targetFilename))

    console.log('converted', chrFilename, 'to', targetFilename)
  })
})