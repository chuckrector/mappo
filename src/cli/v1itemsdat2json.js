const process = require('process')

const fs = require('fs')
const asset = require('../asset')

const itemsDatFilename = process.argv[2]
const itemsDatData = asset.fromDisk(itemsDatFilename, asset.v1itemsdat)
const targetFilename = itemsDatFilename + '.json'

fs.writeFileSync(targetFilename, JSON.stringify(itemsDatData))

console.log('converted', itemsDatFilename, 'to', targetFilename)
