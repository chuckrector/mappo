const process = require('process')

const fs = require('fs')
const createVerge1PalLoader = require('../loader/createVerge1PalLoader')
const createVerge1SmallFntLoader = require('../loader/createVerge1SmallFntLoader')
const createVerge1SmallFntConverter = require('../converter/createVerge1SmallFntConverter')

const palFilename = process.argv[2]
const smallFntFilename = process.argv[3]

fs.readFile(palFilename, (err, diskPalData) => {
  const palLoader = createVerge1PalLoader({data: diskPalData})
  const palData = palLoader.load()

  fs.readFile(smallFntFilename, (err, diskSmallFntData) => {
    const smallFntLoader = createVerge1SmallFntLoader({data: diskSmallFntData})
    const smallFntData = smallFntLoader.load()
    const smallFntConverter = createVerge1SmallFntConverter({
      palette: palData.pal,
      fnt: smallFntData.fnt,
    })

    const png = smallFntConverter.convertToPng()
    const targetFilename = smallFntFilename + '.png'

    png.pack().pipe(fs.createWriteStream(targetFilename))

    console.log('converted', smallFntFilename, 'to', targetFilename)
  })
})
