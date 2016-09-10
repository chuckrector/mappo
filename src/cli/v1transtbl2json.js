const process = require('process')

const fs = require('fs')
const asset = require('../asset')

const transTblFilename = process.argv[2]
const transTblData = asset.fromDisk(transTblFilename, asset.v1transtbl)
const targetFilename = transTblFilename + '.json'

fs.writeFileSync(targetFilename, JSON.stringify(transTblData))

console.log('converted', transTblFilename, 'to', targetFilename)
