const process = require('process')

const fs = require('fs')
const createVerge1VspLoader = require('./createVerge1VspLoader')
const createVerge1VspConverter = require('./createVerge1VspConverter')

const vspFilename = process.argv[2]
fs.readFile(vspFilename, (err, data) => {
  const loader = createVerge1VspLoader({data})
  const vsp = loader.load()
  const converter = createVerge1VspConverter(vsp)
  const png = converter.convertToPng()

  png.pack().pipe(fs.createWriteStream(vspFilename + '.png'))
})
