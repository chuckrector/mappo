const process = require('process')

const fs = require('fs')
const createVerge1PalLoader = require('./createVerge1PalLoader')
const createVerge1MainFntLoader = require('./createVerge1MainFntLoader')
const createVerge1MainFntConverter = require('./createVerge1MainFntConverter')

const palFilename = process.argv[2]
const mainFntFilename = process.argv[3]

fs.readFile(palFilename, (err, diskPalData) => {
  const palLoader = createVerge1PalLoader({data: diskPalData})
  const palData = palLoader.load()

  fs.readFile(mainFntFilename, (err, diskMainFntData) => {
    const mainFntLoader = createVerge1MainFntLoader({data: diskMainFntData})
    const mainFntData = mainFntLoader.load()
    const mainFntConverter = createVerge1MainFntConverter({
      palette: palData.pal,
      fnt2: mainFntData.fnt2,
    })

    const png = mainFntConverter.convertToPng()

    png.pack().pipe(fs.createWriteStream(mainFntFilename + '.png'))
  })
})
