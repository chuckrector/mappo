const process = require('process')

const fs = require('fs')
const createVerge1PalLoader = require('../loader/createVerge1PalLoader')
const createVerge1SpeechSpcLoader = require('../loader/createVerge1SpeechSpcLoader')
const createVerge1SpeechSpcConverter = require('../converter/createVerge1SpeechSpcConverter')

const palFilename = process.argv[2]
const speechSpcFilename = process.argv[3]

fs.readFile(palFilename, (err, diskPalData) => {
  const palLoader = createVerge1PalLoader({data: diskPalData})
  const palData = palLoader.load()

  fs.readFile(speechSpcFilename, (err, diskSpeechSpcData) => {
    const speechSpcLoader = createVerge1SpeechSpcLoader({data: diskSpeechSpcData})
    const speechSpcData = speechSpcLoader.load()
    const speechSpcConverter = createVerge1SpeechSpcConverter({
      palette: palData.pal,
      numtiles: speechSpcData.numtiles,
      speech: speechSpcData.speech,
    })

    const png = speechSpcConverter.convertToPng()

    png.pack().pipe(fs.createWriteStream(speechSpcFilename + '.png'))
  })
})
