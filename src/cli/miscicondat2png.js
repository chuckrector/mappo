const process = require('process')

const fs = require('fs')
const createVerge1PalLoader = require('../loader/createVerge1PalLoader')
const createVerge1MiscIconDatLoader = require('../loader/createVerge1MiscIconDatLoader')
const createVerge1MiscIconDatConverter = require('../converter/createVerge1MiscIconDatConverter')

const palFilename = process.argv[2]
const miscIconDatFilename = process.argv[3]

fs.readFile(palFilename, (err, diskPalData) => {
  const palLoader = createVerge1PalLoader({data: diskPalData})
  const palData = palLoader.load()

  fs.readFile(miscIconDatFilename, (err, diskMiscIconDatData) => {
    const miscIconDatLoader = createVerge1MiscIconDatLoader({data: diskMiscIconDatData})
    const miscIconDatData = miscIconDatLoader.load()
    const miscIconDatConverter = createVerge1MiscIconDatConverter({
      palette: palData.pal,
      numtiles: miscIconDatData.numtiles,
      menuptr: miscIconDatData.menuptr,
      itmptr: miscIconDatData.itmptr,
      charptr: miscIconDatData.charptr,
    })

    const png = miscIconDatConverter.convertToPng()
    const targetFilename = miscIconDatFilename + '.png'

    png.pack().pipe(fs.createWriteStream(targetFilename))

    console.log('converted', miscIconDatFilename, 'to', targetFilename)
  })
})
