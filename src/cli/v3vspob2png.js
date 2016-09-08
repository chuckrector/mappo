const process = require('process')

const fs = require('fs')
const createVerge3VspLoader = require('../loader/createVerge3VspLoader')
const createVerge3VspObConverter = require('../converter/createVerge3VspObConverter')
const fill = require('lodash/fill')

const vspFilename = process.argv[2]
const data = fs.readFileSync(vspFilename)
const loader = createVerge3VspLoader({data})
const vsp = loader.load()
const palette = fill(Array(256 * 3), 128)
const converter = createVerge3VspObConverter({
  palette,
  numtiles: vsp.numtiles,
  obs: vsp.obs.decompressed,
})
const png = converter.convertToPng()
const targetFilename = vspFilename + '-obstructions.png'

png.pack().pipe(fs.createWriteStream(targetFilename))

console.log('converted', vspFilename, 'to', targetFilename)
