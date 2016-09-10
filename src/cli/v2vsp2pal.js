const process = require('process')

const fs = require('fs')
const path = require('path')
const asset = require('../asset')

const vspFilename = process.argv[2]
const vspData = asset.fromDisk(vspFilename, asset.v2vsp)
const targetFilename = path.format({
  dir: path.dirname(vspFilename),
  base: 'VERGE2.PAL',
})

fs.writeFileSync(targetFilename, Buffer.from(vspData.palette))

console.log('converted', vspFilename, 'to', targetFilename)
