const process = require('process')

const fs = require('fs')
const createVerge3VspLoader = require('../loader/createVerge3VspLoader')
const createVerge3VspConverter = require('../converter/createVerge3VspConverter')

const vspFilename = process.argv[2]
fs.readFile(vspFilename, (err, data) => {
  const loader = createVerge3VspLoader({data})
  const vsp = loader.load()
  const converter = createVerge3VspConverter({
    numtiles: vsp.numtiles,
    tiledatabuf: vsp.tiledatabuf.decompressed,
  })
  const png = converter.convertToPng()
  const targetFilename = vspFilename + '.png'

  png.pack().pipe(fs.createWriteStream(targetFilename))

  console.log('converted', vspFilename, 'to', targetFilename)
})
