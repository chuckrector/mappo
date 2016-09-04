const process = require('process')

const fs = require('fs')
const createVerge2VspLoader = require('../loader/createVerge2VspLoader')
const createVerge2VspConverter = require('../converter/createVerge2VspConverter')

const vspFilename = process.argv[2]
fs.readFile(vspFilename, (err, data) => {
  const loader = createVerge2VspLoader({data})
  const vsp = loader.load()
  const converter = createVerge2VspConverter({
    palette: vsp.palette,
    numtiles: vsp.numtiles,
    imagedata: vsp.imagedata.decompressed,
  })
  const png = converter.convertToPng()
  const targetFilename = vspFilename + '.png'

  png.pack().pipe(fs.createWriteStream(targetFilename))

  console.log('converted', vspFilename, 'to', targetFilename)
})
