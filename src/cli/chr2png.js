const process = require('process')

const fs = require('fs')
const createVerge1PalLoader = require('../createVerge1PalLoader')
const createVerge1ChrLoader = require('../createVerge1ChrLoader')
const createVerge1ChrConverter = require('../createVerge1ChrConverter')

const palFilename = process.argv[2]
const chrFilename = process.argv[3]

fs.readFile(palFilename, (err, diskPalData) => {
  const palLoader = createVerge1PalLoader({data: diskPalData})
  const palData = palLoader.load()

  fs.readFile(chrFilename, (err, diskChrData) => {
    const chrLoader = createVerge1ChrLoader({data: diskChrData})
    const chrData = chrLoader.load()
    const chrConverter = createVerge1ChrConverter({
      palette: palData.pal,
      chrs: chrData.chrs,
    })

    const png = chrConverter.convertToPng()

    png.pack().pipe(fs.createWriteStream(chrFilename + '.png'))
  })
})
