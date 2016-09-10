const process = require('process')

const fs = require('fs')
const createVerge1SpeechSpcLoader = require('../loader/createVerge1SpeechSpcLoader')
const createVerge1SpeechSpcConverter = require('../converter/createVerge1SpeechSpcConverter')
const asset = require('../asset')

const palFilename = process.argv[2]
const speechSpcFilename = process.argv[3]

const palData = asset.fromDisk(palFilename, asset.v1pal)

const diskSpeechSpcData = fs.readFileSync(speechSpcFilename)
const speechSpcLoader = createVerge1SpeechSpcLoader({data: diskSpeechSpcData})
const speechSpcData = speechSpcLoader.load()
const speechSpcConverter = createVerge1SpeechSpcConverter({
  palette: palData.pal,
  numtiles: speechSpcData.numtiles,
  speech: speechSpcData.speech,
})

const png = speechSpcConverter.convertToPng()
const targetFilename = speechSpcFilename + '.png'

png.pack().pipe(fs.createWriteStream(targetFilename))

console.log('converted', speechSpcFilename, 'to', targetFilename)
