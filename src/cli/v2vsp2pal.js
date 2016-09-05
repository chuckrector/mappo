const process = require('process')

const fs = require('fs')
const path = require('path')
const createDataReader = require('../createDataReader')

const vspFilename = process.argv[2]

const vspData = fs.readFileSync(vspFilename)
const reader = createDataReader({data: vspData})
reader.readWord()
const palette = reader.readByteArray(256 * 3)
const targetFilename = path.format({
  dir: path.dirname(vspFilename),
  base: 'VERGE2.PAL',
})
fs.writeFileSync(targetFilename, Buffer.from(palette))

console.log('converted', vspFilename, 'to', targetFilename)
