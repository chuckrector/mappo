const process = require('process')

const fs = require('fs')
const createVerge3VspConverter = require('../converter/createVerge3VspConverter')
const asset = require('../asset')

const vspFilename = process.argv[2]
const vsp = asset.fromDisk(vspFilename, asset.v3vsp)
const converter = createVerge3VspConverter({
  numtiles: vsp.numtiles,
  tiledatabuf: vsp.tiledatabuf.decompressed,
})
const png = converter.convertToPng()
const targetFilename = vspFilename + '.png'

png.pack().pipe(fs.createWriteStream(targetFilename))

console.log('converted', vspFilename, 'to', targetFilename)
