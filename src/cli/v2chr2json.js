const process = require('process')

const fs = require('fs')
const asset = require('../asset')

const palFilename = process.argv[2]
const chrFilename = process.argv[3]

const palData = asset.fromDisk(palFilename, asset.v1pal)
const chrData = asset.fromDisk(chrFilename, asset.v2chr)
chrData.palette = palData.pal

const targetFilename = chrFilename + '.json'

fs.writeFileSync(targetFilename, JSON.stringify(chrData))

console.log('converted', chrFilename, 'to', targetFilename)
