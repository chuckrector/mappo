const process = require('process')

const fs = require('fs')
const createVerge1PalLoader = require('../loader/createVerge1PalLoader')
const createVerge1MainFntLoader = require('../loader/createVerge1MainFntLoader')
const createVerge1MainFntConverter = require('../converter/createVerge1MainFntConverter')

const palFilename = process.argv[2]
const mainFntFilename = process.argv[3]

const diskPalData = fs.readFileSync(palFilename)
const palLoader = createVerge1PalLoader({data: diskPalData})
const palData = palLoader.load()

const diskMainFntData = fs.readFileSync(mainFntFilename)
const mainFntLoader = createVerge1MainFntLoader({data: diskMainFntData})
const mainFntData = mainFntLoader.load()
const mainFntConverter = createVerge1MainFntConverter({
  palette: palData.pal,
  fnt2: mainFntData.fnt2,
})

const png = mainFntConverter.convertToPng()
const targetFilename = mainFntFilename + '.png'

png.pack().pipe(fs.createWriteStream(targetFilename))

console.log('converted', mainFntFilename, 'to', targetFilename)
